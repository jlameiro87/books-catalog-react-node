const csv = require('csv-parser');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.set('port', (process.env.PORT || 3003));

// Reading csv
const results = [];

fs.createReadStream('books.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(`books readed ${results.length}`)
    });

app.get('/api/books', (req, res) => {
    // Access the provided 'page' and 'limt' query parameters
    let page = req.query.page | 0;
    let limit = req.query.limit | 5000;

    res.json(results.slice(page, limit));
});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});