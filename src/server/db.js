import config from './config';
import mysql from 'mysql';

let connection = mysql.createConnection({
  host:     config.database.host,
  user:     config.database.user,
  password: config.database.password
});
connection.query('USE ' + config.database.database);

export default connection;
