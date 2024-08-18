const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Create the books table
db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    category_id INTEGER,
    FOREIGN KEY(category_id) REFERENCES categories(id)
)`);

// GET all books
router.get('/', (req, res) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET a book by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: 'Book not found' });
        res.json(row);
    });
});

// POST a new book
router.post('/', (req, res) => {
    const { title, author, category_id } = req.body;
    db.run('INSERT INTO books (title, author, category_id) VALUES (?, ?, ?)', [title, author, category_id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, author, category_id });
    });
});

// PUT (Update) a book by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, author, category_id } = req.body;
    db.run('UPDATE books SET title = ?, author = ?, category_id = ? WHERE id = ?', [title, author, category_id, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Book not found' });
        res.json({ id, title, author, category_id });
    });
});

// DELETE a book by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    });
});

module.exports = router;
