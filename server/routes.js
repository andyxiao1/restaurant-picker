/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- Test Route ---- */
function test(req, res) {
  const sql = `SELECT * FROM Business WHERE ROWNUM <= 10`;
  req._oracledb
    .execute(sql)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
}

/* ---- Head to Head Page ---- */
function headtohead(req, res) {
  // const query = `
  //   SELECT DISTINCT genre
  //   FROM Genres;
  // `;
  // connection.query(query, function (err, rows, fields) {
  //   if (err) console.log(err);
  //   else {
  //     res.json(rows);
  //   }
  // });
}

/* ---- Filter Page Top ---- */
function getGrades(req, res) {
	const sql = `
  SELECT DISTINCT current_grade as grade
  FROM Inspection
  WHERE current_grade <> 'X'
  ORDER BY current_grade ASC`;
  req._oracledb
    .execute(sql)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
}

function bestRestsForGrade(req, res) {
  var selectedGrade = req.params.selectedGrade;
	const sql = `
  SELECT b.Name as name, b.Stars as stars, i.current_grade as grade, b.Address as address
  FROM Business b Join Inspection i ON b.name = i.restaurant_name
  WHERE i.current_grade <= '${selectedGrade}'
  ORDER BY Stars desc;
  `;
  req._oracledb
  .execute(sql)
  .then((data) => res.send(data))
  .catch((err) => console.log(err));
}



// The exported functions, which can be accessed in index.js.
module.exports = {
  test,
  headtohead,
  getGrades,
  bestRestsForGrade
};
