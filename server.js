const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'root',
    database: 'movieReviews_db'
  },
  console.log(`Connected to the movieReviews_db database.`)
);

var createdMovie = 'createdmovie'
// Hardcoded query: ADD TO course_names WHERE id = 3;
db.query(`INSERT INTO movies (movie_name) VALUES (?)`, createdMovie, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

var movieId = 3
var createdReview = [movieId, 'createdreview']
// Hardcoded query: ADD TO course_names WHERE id = 3;
db.query(`INSERT INTO reviews (movie_id, review) VALUES (?, ?)`, createdReview, (err, result) => {
  if (err) { 
    console.log(err);
  }
  console.log(result);
});

// Query database
db.query(`SELECT movies.movie_name AS movie, reviews.review AS review
FROM reviews
JOIN movies ON movies.id = reviews.movie_id;`, function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
