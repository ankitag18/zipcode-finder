const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use('/css', express.static(path.join(__dirname, 'public')));
app.use('/documents', express.static(path.join(__dirname, 'public/documents')));

api(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} successfully`);
});