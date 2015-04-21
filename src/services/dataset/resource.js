if (!process.env.IS_BROWSER) {
  var db = require('../../server/db');
}

const table = 'information';
const columns = {
  originalDatabaseName: 'original_database_name',
  description: 'description',
  databaseSize: 'database_size',
  tableCount: 'table_count',
  isArtificial: 'is_artificial',
  domain: 'domain',
  nullCount: 'null_count',
  numericCount: 'numeric_count',
  stringCount: 'string_count',
  lobCount: 'lob_count',
  dateCount: 'date_count',
  geoCount: 'geo_count'
};

export default {
  getDatasets: () => {
    return new Promise((resolve, reject) => {
      let datasets = [];
      db
        .select(getValues(columns))
        .from(table)
        .whereNotNull('original_database_name')
        .map(getUniqueDatasets(datasets))
        .catch((err) => { throw err; })
        .then(() => resolve(datasets));
    });
  },
  getDataset: (dataset: string) => {
    return new Promise((resolve, reject) => {
      db
        .select()
        .from(table)
        .where('original_database_name', dataset)
        .limit(1)
        .catch((err) => { throw err; })
        .then((rows) => resolve(rows[0]));
    });
  },
  getSearchResults: (query: string) => {
    return new Promise((resolve, reject) => {
      let datasets = [];
      db
        .select(getValues(columns))
        .from(table)
        .where('original_database_name', 'like', '%'+query+'%')
        .map(getUniqueDatasets(datasets))
        .catch((err) => { throw err; })
        .then(() => resolve(datasets));
    });
  }
};

function getValues(object: Object) {
  return Object.keys(object).map(function(k) {return object[k]; });
}

function getUniqueDatasets(datasets) {
  let names = [];
  return (row) => {
    if (names.indexOf(row.original_database_name) === -1) {
      names.push(row.original_database_name);
      datasets.push(row);
    }
  };
}
