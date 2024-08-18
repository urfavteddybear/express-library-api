const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const booksRouter = require('./routes/books');
const categoriesRouter = require('./routes/categories');

app.use(bodyParser.json());

app.use('/api/books', booksRouter);
app.use('/api/categories', categoriesRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
