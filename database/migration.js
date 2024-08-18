const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database.db');


// Create the categories table
db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
)`);

// Create the books table
db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    category_id INTEGER,
    description TEXT,
    FOREIGN KEY(category_id) REFERENCES categories(id)
)`);
