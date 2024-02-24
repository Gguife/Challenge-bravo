import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'bravo'
});

export default connection;