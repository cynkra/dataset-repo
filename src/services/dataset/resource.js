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
  getSearchResults: (query: string, databaseSize: Array, tableCount: Array, type: Array, domain: Array, missingValues: Array, dataType: Array) => {
    return new Promise((resolve, reject) => {
      let datasets = [];
      db
        .select(getValues(columns))
        .from(table)
        .where('original_database_name', 'like', '%'+query+'%')
        .where(filterDatabaseSize(databaseSize))
        .where(filterTableCount(tableCount))
        .where(filterType(type))
        .where(filterDomain(domain))
        .where(filterMissingValues(missingValues))
        .where(filterDataType(dataType))
        .map(getUniqueDatasets(datasets))
        .catch((err) => { throw err; })
        .then(() => resolve(datasets));
    });
  }
};

function getUniqueDatasets(datasets) {
  let names = [];
  return (row) => {
    if (names.indexOf(row.original_database_name) === -1) {
      names.push(row.original_database_name);
      datasets.push(row);
    }
  };
}

function filterDatabaseSize(databaseSize: Array) {
  databaseSize = databaseSize.filter((n) => { return ['KB', 'MB', 'GB'].indexOf(n) !== -1; });
  return function() {
    if (databaseSize.indexOf('KB') !== -1) { this.orWhere('database_size', '<', 1); }
    if (databaseSize.indexOf('MB') !== -1) { this.orWhereBetween('database_size', [1, 1000]); }
    if (databaseSize.indexOf('GB') !== -1) { this.orWhere('database_size', '>=', 1000); }
    if (databaseSize.length === 0) { return this.where(true); }
  };
}

function filterTableCount(tableCount: Array) {
  tableCount = tableCount.filter((n) => { return n.indexOf('-') !== -1 || n.indexOf('+') !== -1; });
  return function() {
    tableCount.forEach((item) => {
      if (item.indexOf('-') !== -1) {
        // 10-30
        const bounds = item.split('-').map((n) => parseInt(n, 10));
        this.orWhereBetween('table_count', [bounds[0], bounds[1]]);
      } else {
        // 30+
        const bounds = item.split('+').map((n) => parseInt(n, 10));
        this.orWhere('table_count', '>=', bounds[0]);
      }
    });
    if (tableCount.length === 0) { this.where(true); }
  };
}

function filterType(type: Array) {
  type = type.filter((n) => { return ['Real', 'Synthetic'].indexOf(n) !== -1; });
  return function() {
    if (type.indexOf('Real') !== -1) { this.orWhere('is_artificial', 0); }
    if (type.indexOf('Synthetic') !== -1) { this.orWhere('is_artificial', 1); }
    if (type.length === 0) { this.where(true); }
  };
}

function filterDomain(domain: Array) {
  domain = domain.filter((n) => { return n !== ''; });
  return function() {
    if (domain.length === 0) {
      this.where(true);
    } else {
      this.whereIn('domain', domain);
    }
  };
}

function filterMissingValues(missingValues: Array) {
  missingValues = missingValues.filter((n) => { return ['Missing values'].indexOf(n) !== -1; });
  return function() {
    if (missingValues.indexOf('Missing values') !== -1) { this.orWhere('null_count', '!=', 0); }
    if (missingValues.length === 0) { this.where(true); }
  };
}

function filterDataType(dataType: Array) {
  dataType = dataType.filter((n) => { return ['Date', 'Geo', 'Lob', 'Numeric', 'String'].indexOf(n) !== -1; });
  return function() {
    if (dataType.indexOf('Date') !== -1) { this.where('date_count', '>', 0); }
    if (dataType.indexOf('Geo') !== -1) { this.where('geo_count', '>', 0); }
    if (dataType.indexOf('Lob') !== -1) { this.where('lob_count', '>', 0); }
    if (dataType.indexOf('Numeric') !== -1) { this.where('numeric_count', '>', 0); }
    if (dataType.indexOf('String') !== -1) { this.where('string_count', '>', 0); }
    if (dataType.length === 0) { return this.where(true); }
  };
}

function getValues(object: Object) {
  return Object.keys(object).map(function(k) {return object[k]; });
}
