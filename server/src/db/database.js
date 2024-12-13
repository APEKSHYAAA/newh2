const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./userData.db', (err) => {
  if (err) console.log('Error connecting to the database:', err.message);
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      usertype TEXT CHECK(usertype IN ('owner', 'investor')),
      password TEXT
    )
  `, (err) => {
    if (err) console.log('Error creating table:', err.message);
  });
});

module.exports = db;
