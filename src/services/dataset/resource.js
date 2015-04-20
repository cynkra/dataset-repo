if (!process.env.IS_BROWSER) {
  var connection = require('../../server/db');
}

export default {
  getDatasets: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT original_database_name, description, database_size, table_count, is_artificial, domain, null_count, numeric_count, string_count, lob_count, date_count, geo_count FROM information WHERE original_database_name IS NOT NULL`,
        (err, rows, fields) => {
          if (err) { throw err; }
          let datasets = [];
          let names = [];
          rows.forEach((row, i) => {
            if (names.indexOf(row.original_database_name) === -1) {
              names.push(row.original_database_name);
              datasets.push(row);
            }
          });
          resolve(datasets);
        });
    });
  },
  getDataset: (dataset: string) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM information WHERE original_database_name='${dataset}' LIMIT 1`,
        (err, rows, fields) => {
          if (err) { throw err; }
          resolve(rows[0]);
        });
    });
  },
  getSearchResults: (query: string) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT original_database_name, description, database_size, table_count, is_artificial, domain, null_count, numeric_count, string_count, lob_count, date_count, geo_count FROM information WHERE original_database_name LIKE '%${query}%'`,
        (err, rows, fields) => {
          if (err) { throw err; }
          let datasets = [];
          let names = [];
          rows.forEach((row, i) => {
            if (names.indexOf(row.original_database_name) === -1) {
              names.push(row.original_database_name);
              datasets.push(row);
            }
          });
          resolve(datasets);
        });
    });
  }
};
