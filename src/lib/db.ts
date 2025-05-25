// lib/db.ts
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'sistema_ades',
});

export default connection;
