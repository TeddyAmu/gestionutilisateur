const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'view')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'home.html'));
});

app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'users.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://${process.env.APP_LOCALHOST}:${PORT}`);
});
