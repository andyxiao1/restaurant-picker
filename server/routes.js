const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

// config.connectionLimit = 10;
const connection = await oracledb.getConnection(dbConfig);
// usage example:     result = await connection.execute(sql, binds, options);
// var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  const query = `
    SELECT DISTINCT genre
    FROM Genres;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  const query = `
    SELECT M.title, M.rating, M.vote_count
    FROM Movies M JOIN Genres G ON M.id = G.movie_id
    WHERE G.genre = '${req.params.genre}'
    ORDER BY M.rating DESC, M.vote_count DESC
    LIMIT 10;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  const query = `
    WITH user_movie(id) AS
        (SELECT id
        FROM Movies
        WHERE title = '${req.params.title}'
        ORDER BY rating DESC, vote_count DESC
        LIMIT 1),
      user_movie_genres(genre) AS
        (SELECT genre
        FROM Genres
        WHERE movie_id IN 
          (SELECT id as movie_id FROM user_movie))
    SELECT title, id, rating, vote_count
    FROM Movies m
    WHERE NOT EXISTS
      (SELECT * 
      FROM user_movie_genres 
      WHERE genre NOT IN (SELECT genre FROM Genres WHERE m.id = movie_id))
    AND title <> '${req.params.title}'
    ORDER BY rating DESC, vote_count DESC
    LIMIT 5;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
  var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  const query = `
    WITH avg_per_decade AS
        (SELECT genre, IFNULL(AVG(rating), 0) AS avg_rating
        FROM Genres g LEFT OUTER JOIN Movies m ON m.id = g.movie_id
        WHERE (m.release_year >= (${req.params.decade})
          AND m.release_year < (${req.params.decade} + 10))
          OR m.release_year IS NULL
        GROUP BY genre),
      genres_not_in_decade AS
        (SELECT DISTINCT genre, 0 AS avg_rating
        FROM Genres
        WHERE genre NOT IN (SELECT genre FROM avg_per_decade))
    (SELECT * FROM avg_per_decade)
    UNION
    (SELECT * FROM genres_not_in_decade)
    ORDER BY avg_rating DESC, genre;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  getAllGenres: getAllGenres,
  getTopInGenre: getTopInGenre,
  getRecs: getRecs,
  getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade,
};
