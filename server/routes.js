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

function preferences(req, res){
  var uname = req.params.username;
  var price = req.params.price;
  var takeout = req.params.takeout;
  var outdoor = req.params.outdoor;
  var credit = req.params.credit;
  console.log(uname);
  const sql_pref = `SELECT name, address, compat FROM(
SELECT B.name, B.address, B.takeout, b.outdoor, b.credit, b.price_range, (B.takeout * ${takeout} + B.outdoor * ${outdoor} + b.price_range * ${price} + b.credit * ${credit}) as compat
FROM business B
WHERE ROWNUM <= 10
ORDER BY compat DESC)`;
  req._oracledb
    .execute(sql_pref)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  test,
  headtohead,
  preferences,
};
