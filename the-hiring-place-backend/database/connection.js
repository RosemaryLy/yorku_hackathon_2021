import mysql from 'mysql'
import * as dotenv from "dotenv";

dotenv.config();

const configuration = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
};

if (process.env.DATABASE_SOCKET) {
    configuration.socketPath = process.env.DATABASE_SOCKET
} else {
    configuration.host = process.env.DB_HOST
}

const mysqlConnection = mysql.createConnection(configuration);


mysqlConnection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("Database connected");
});

export default mysqlConnection;
