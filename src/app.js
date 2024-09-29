const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const booksRouter = require('./routes/books');
const categoriesRouter = require('./routes/categories');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Logging middleware
// app.use((req, res, next) => {
//     const now = new Date();
//     const logMessage = `${now.toISOString()} - ${req.method} ${req.originalUrl}`;
//     console.log(logMessage);
//     next(); // Proceed to the next middleware or route handler
// });

// Logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' });
app.use(morgan(':date[iso] - :remote-addr - :method :url :status :response-time ms', { stream: accessLogStream })); // Log to file
app.use(morgan(':date[iso] - :remote-addr - :method :url :status :response-time ms')); // Log to console as well
app.set('trust proxy', true);

app.use(bodyParser.json());

app.use('/api/books', booksRouter);
app.use('/api/categories', categoriesRouter);

// Start the server
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0'; // Specify the IP address

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
