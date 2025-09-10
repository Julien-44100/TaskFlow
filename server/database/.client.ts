import "dotenv/config";
import mysql from "mysql2/promise";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const databaseClient = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT ? Number(DB_PORT) : 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  namedPlaceholders: true,
  connectionLimit: 10,
});

export type Rows = mysql.RowDataPacket[];
export type Result = mysql.ResultSetHeader;

export default databaseClient;
