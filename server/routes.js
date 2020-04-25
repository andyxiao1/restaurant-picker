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

// The exported functions, which can be accessed in index.js.
module.exports = {
  test,
  headtohead,
};
