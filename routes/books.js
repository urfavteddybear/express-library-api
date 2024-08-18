const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database.db');

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
// POST a new book with category validation
// POST a new book with category validation
router.post('/', (req, res) => {
    const { title, author, category_id, description } = req.body;

    // Check if category_id exists
    db.get('SELECT * FROM categories WHERE id = ?', [category_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(400).json({ message: 'Category not found' });
        }

        // If category exists, proceed to insert the book
        db.run('INSERT INTO books (title, author, category_id, description) VALUES (?, ?, ?, ?)', [title, author, category_id, description], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, title, author, category_id, description });
        });
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
