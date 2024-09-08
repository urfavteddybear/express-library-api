const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const booksRouter = require('./routes/books');
const categoriesRouter = require('./routes/categories');

// Logging middleware
app.use((req, res, next) => {
    const now = new Date();
    const logMessage = `${now.toISOString()} - ${req.method} ${req.originalUrl}`;
    console.log(logMessage);
    next(); // Proceed to the next middleware or route handler
});

app.use(bodyParser.json());

app.use('/api/books', booksRouter);
app.use('/api/categories', categoriesRouter);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
