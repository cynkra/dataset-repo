if (!process.env.IS_BROWSER) {
  var db = require('../../server/db');
}

const table = 'information';

export default {
  getContributors: () => {
    return new Promise((resolve, reject) => {
      db
        .column('uploader')
        .column('uploader_url')
        .count('* as count')
        .from(table)
        .where('is_hidden', 0)
        .whereNotNull('original_database_name')
        .whereNotNull('uploader')
        .groupBy('uploader', 'uploader_url')
        .orderBy('count', 'DESC')
        .catch((err) => { throw err; })
        .then((rows) => resolve(rows));
    });
  }
};
