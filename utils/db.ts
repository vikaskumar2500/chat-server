import mysql from 'mysql2';

const db = mysql.createPool({
  user:"root",
  password:""
})