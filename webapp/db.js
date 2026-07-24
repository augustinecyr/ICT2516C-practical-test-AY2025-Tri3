const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

async function logSearchQuery(term) {
  // parameterized query - never string-concatenate user input into SQL
  await pool.execute(
    "INSERT INTO `2300411` (search_term, queried_at) VALUES (?, NOW())",
    [term]
  );
}

module.exports = { logSearchQuery };
