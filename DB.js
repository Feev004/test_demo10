const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "school",
  charset: "utf8mb4",
});
module.exports = pool;