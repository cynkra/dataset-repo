if (!process.env.IS_BROWSER) {
  var knex = require('knex');
}
import config from '../../config/config.server';
import nunjucks from 'nunjucks';
import path from 'path';
import fs from 'fs';
import {exec} from 'child_process';

export function getSchema(dbName: string) {

  var data = [
        {
            "table": "atom",
            "column": "charge",
            "relevance": 3.197
        },
        {
            "table": "atom",
            "column": "type",
            "relevance": 7.074
        },
        {
            "table": "bond",
            "column": "type",
            "relevance": 6.325
        },
        {
            "table": "molecule",
            "column": "ind1",
            "relevance": 8.975
        },
        {
            "table": "molecule",
            "column": "inda",
            "relevance": 0.091
        },
        {
            "table": "molecule",
            "column": "logp",
            "relevance": 5.404
        },
        {
            "table": "molecule",
            "column": "lumo",
            "relevance": 4.404
        }
    ];

    // get minimal and maximal relevances
    var maxValue = -1;
    var minValue = 100000000000;
    for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
            var value = data[prop].relevance;
            if (value > maxValue) {
                maxValue = value;
            }
            if (value < minValue) {
                minValue = value;
            }
        }
    }

    // normalize the relevance into range 0..255 and calculate the color
    for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
            data[prop].normRelevance = Math.floor((data[prop].relevance - minValue) / (maxValue-minValue) * 255);
            data[prop].columnColor = "#ff"+(255-data[prop].normRelevance).toString(16)+(255-data[prop].normRelevance).toString(16);
        }
    }

    // remove all whitespaces and slashes for graphviz and hope the result will be unique
    function name2id(name: string){
      return name.replace(/\s/g, "").replace(/-/g, "");
    }




  
  // create a new connection to dbName. The connection is going to close itself after a few minutes of inactivity.
  let db = knex({
    client: config.database.client,
    connection: {
      host:     config.database.host,
      user:     config.database.user,
      password: config.database.password,
      database: dbName
    },
    pool: {
      min: 0,
      max: 10
    }
  });

  let tables = [];
  let graph = {
    name: dbName,
    disableFields: false,
    models: []
  };

  // fetch all tables in database
  db
    .select('columns.table_name', 'columns.column_name', 'columns.data_type')
    .from('information_schema.columns')
    .join('information_schema.tables')
    .whereRaw('columns.table_schema = database() and columns.table_schema = tables.table_schema and columns.table_name = tables.table_name and tables.table_type =  "BASE TABLE"')
    .orderByRaw('columns.table_name, columns.ordinal_position')
    .map((el) => {
      const name = el.table_name;
      tables[name] = tables[name] || {};
      tables[name][el.column_name] = {
        name: el.column_name,
        type: el.data_type,
        fk: null
      };
      return tables;
    })
    .then((res) => {
      return db
        .select(knex.raw('TABLE_NAME, min(COLUMN_NAME) as COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, min(REFERENCED_COLUMN_NAME) as REFERENCED_COLUMN_NAME'))
        .from('INFORMATION_SCHEMA.KEY_COLUMN_USAGE')
        .whereRaw('REFERENCED_TABLE_SCHEMA = database()')
        .groupByRaw('TABLE_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME')
        .map((fk) => {
          tables[fk.TABLE_NAME][fk.COLUMN_NAME].fk = {
            table: fk.REFERENCED_TABLE_NAME,
            column: fk.REFERENCED_COLUMN_NAME
          };
          return tables;
        });
    })
    .then((res) => {
      Object.keys(tables).forEach((name) => {
        let model = {
          id: name2id(name),
          name: name,
          fields: [],
          relations: []
        };

        Object.keys(tables[name]).forEach((c) => {
          const col = tables[name][c];
          model.fields.push({
            name: col.name,
            type: col.type
          });
          if (col.fk !== null)
            model.relations.push({
              target: name2id(col.fk.table),
              type: tables[col.fk.table][col.fk.column].type,
              name: col.fk.column,
              arrows: ''
            });
        });
                    console.log(model);
        graph.models.push(model);
      });

      nunjucks.configure(path.join(__dirname, 'tpl'), {autoescape: true});
      const dotStr = nunjucks.render('sqlviz.tpl', graph);

      exec('which dot', (err, stdout, stderr) => {
        if (!err && !stderr) {
          const tmpDotFile = path.join(__dirname, 'tpl', '__sqlviz__.dot');
          const outFilename = path.join(__dirname, '..', '..', '..', 'assets', 'img', 'datasets-generated', dbName + '.svg');
          const dot = stdout.trim();
          const cmd = dot + ' -Tsvg -o ' + outFilename + ' ' + tmpDotFile;

          fs.writeFileSync(tmpDotFile, dotStr);
          exec(cmd);
        } else {
          console.error(stderr + ' ' + err); // eslint-disable-line no-console
          throw new 'Can\'t find dot to generate a svg. Is graphviz installed?';
        }
      });
    });
}