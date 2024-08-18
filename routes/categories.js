const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Create the categories table
db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
)`);

// GET all categories
router.get('/', (req, res) => {
    db.all('SELECT * FROM categories', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET a category by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM categories WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: 'Category not found' });
        res.json(row);
    });
});

// POST a new category
router.post('/', (req, res) => {
    const { name } = req.body;
    db.run('INSERT INTO categories (name) VALUES (?)', [name], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name });
    });
});

// PUT (Update) a category by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    db.run('UPDATE categories SET name = ? WHERE id = ?', [name, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Category not found' });
        res.json({ id, name });
    });
});

// DELETE a category by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM categories WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted successfully' });
    });
});

module.exports = router;
