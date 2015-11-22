if (!process.env.IS_BROWSER) {
  var knex = require('knex');
}
import config from '../../config/config.server';
import nunjucks from 'nunjucks';
import path from 'path';
import fs from 'fs';
import {exec} from 'child_process';

export function getSchema(dbName: string) {
  
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
    .select('table_name', 'column_name', 'data_type')
    .from('information_schema.columns')
    .whereRaw('table_schema = database()')
    .orderByRaw('table_name, ordinal_position')
    .map((el) => {
      const name = el.table_name;
      tables[name] = tables[name] || {};
      tables[name][el.column_name] = {
        name: el.column_name,
        type: el.data_type,
        blank: false,
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
          name: name,
          fields: [],
          relations: []
        };

        Object.keys(tables[name]).forEach((c) => {
          const col = tables[name][c];
          model.fields.push({
            name: col.name,
            type: col.type,
            blank: col.blank
          });
          if (col.fk !== null)
            model.relations.push({
              target: col.fk.table,
              type: tables[col.fk.table][col.fk.column].type,
              name: col.fk.column,
              arrows: ''
            });
        });
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