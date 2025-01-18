const pool = require("../config/db");

async function getRecentStories(limit = 10) {
  const [rows] = await pool.query(
    "SELECT * FROM stories ORDER BY timestamp DESC LIMIT ?",
    [limit]
  );
  return rows;
}

module.exports = { getRecentStories };
