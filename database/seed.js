const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database.db');

const categories = ['Fiction', 'Science', 'History', 'Biography', 'Fantasy'];
const authors = ['Author A', 'Author B', 'Author C', 'Author D', 'Author E'];
const descriptions = [
    'A compelling story about life and adventure.',
    'An insightful book on science and the universe.',
    'A deep dive into the history of civilization.',
    'An inspiring biography of a famous personality.',
    'A fantastic journey into a world of imagination.'
];

// Create categories
const seedCategories = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            categories.forEach((category, index) => {
                db.run('INSERT INTO categories (name) VALUES (?)', [category], (err) => {
                    if (err) {
                        reject(err);
                    }
                    if (index === categories.length - 1) resolve();
                });
            });
        });
    });
};

// Create books
const seedBooks = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            for (let i = 1; i <= 500; i++) {
                const title = `Book Title ${i}`;
                const author = authors[Math.floor(Math.random() * authors.length)];
                const category_id = Math.floor(Math.random() * 5) + 1; // Random category between 1 and 5
                const description = descriptions[Math.floor(Math.random() * descriptions.length)];
                db.run(
                    'INSERT INTO books (title, author, category_id, description) VALUES (?, ?, ?, ?)',
                    [title, author, category_id, description],
                    (err) => {
                        if (err) {
                            reject(err);
                        }
                        if (i === 500) resolve();
                    }
                );
            }
        });
    });
};

// Run the seed script
const seedDatabase = async () => {
    try {
        console.log('Seeding categories...');
        await seedCategories();
        console.log('Seeding books...');
        await seedBooks();
        console.log('Seeding complete.');
    } catch (error) {
        console.error('Error seeding database:', error.message);
    } finally {
        db.close();
    }
};

seedDatabase();
