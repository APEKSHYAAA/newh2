const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./full_database.db', (err) => {
  if (err) console.log('Error connecting to the database:', err.message);
});

db.serialize(() => {
  // Create the 'users' table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usermail TEXT UNIQUE,
      usertype TEXT CHECK(usertype IN ('owner', 'investor')),
      password TEXT
    )
  `, (err) => {
    if (err) console.log('Error creating table:', err.message);
  });

  // Create the 'investor' table
  db.run(`
    CREATE TABLE IF NOT EXISTS investor (
      id INTEGER PRIMARY KEY,
      investment TEXT NOT NULL,
      amount REAL NOT NULL,
      FOREIGN KEY (id) REFERENCES users (id)
    )
  `, (err) => {
    if (err) console.log('Error creating "investor" table:', err.message);
  });

  // Create the 'owner' table
  db.run(`
    CREATE TABLE IF NOT EXISTS owner (
      id INTEGER PRIMARY KEY,
      market TEXT NOT NULL,
      description TEXT,
      fund_to_be_raised REAL NOT NULL,
      collected REAL DEFAULT 0,
      FOREIGN KEY (id) REFERENCES users (id)
    )
  `, (err) => {
    if (err) console.log('Error creating "owner" table:', err.message);
  });
});

module.exports = db;
