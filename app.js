const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const app = express();

// Database Connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Vansh@1234',
    database: 'movie_database'
});

db.connect(err => {
    if (err) console.log('DB Error:', err.message);
    else console.log('Connected to MySQL!');
});

// Setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// READ - Show all movies
app.get('/', (req, res) => {
    db.query('SELECT * FROM movies ORDER BY id ', (err, movies) => {
        if (err) return res.send('Error loading movies');
        res.render('index', { movies });
    });
});

// CREATE - Show add form
app.get('/add', (req, res) => {
    res.render('add');
});

// CREATE - Save new movie
app.post('/movies', (req, res) => {
    const { title, director, genre, year, rating } = req.body;
    const sql = 'INSERT INTO movies (title, director, genre, year, rating) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, director, genre, year || null, rating || null], (err) => {
        if (err) return res.send('Error adding movie');
        res.redirect('/');
    });
});

// UPDATE - Show edit form
app.get('/edit/:id', (req, res) => {
    db.query('SELECT * FROM movies WHERE id = ?', [req.params.id], (err, results) => {
        if (err || results.length === 0) return res.send('Movie not found');
        res.render('edit', { movie: results[0] });
    });
});

// UPDATE - Save changes
app.post('/edit/:id', (req, res) => {
    const { title, director, genre, year, rating } = req.body;
    const sql = 'UPDATE movies SET title=?, director=?, genre=?, year=?, rating=? WHERE id=?';
    db.query(sql, [title, director, genre, year || null, rating || null, req.params.id], (err) => {
        if (err) return res.send('Error updating');
        res.redirect('/');
    });
});

// DELETE - Remove movie
app.get('/delete/:id', (req, res) => {
    db.query('DELETE FROM movies WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.send('Error deleting');
        res.redirect('/');
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
