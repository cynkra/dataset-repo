if (!process.env.IS_BROWSER) {
  var db = require('../../server/db');
}

const table = 'information';

export default {
  getContributors: () => {
    return new Promise((resolve, reject) => {
      db
        .column('uploader')
        .count('* as count')
        .from(table)
        .whereNotNull('original_database_name')
        .whereNotNull('uploader')
        .groupBy('uploader')
        .orderBy('count', 'DESC')
        .catch((err) => { throw err; })
        .then((rows) => {
          resolve(rows);
        });
    });
  }
};
