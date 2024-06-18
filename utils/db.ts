import mysql from "mysql2";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// export const db = mysql.createConnection({
//   database: process.env.DB_NAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   port: +process.env.DB_PORT!,
// });
export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);
