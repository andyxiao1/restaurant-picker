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

/* ---- Head to Head Comparison Page ---- */
function compare(req, res) {
  const { id1, id2 } = req.query;
  if (!id1 || !id2) {
    req.json({ successful: false, message: 'missing restaurant ids' });
  } else {
    const sql = `
WITH Combined AS (
  (
      SELECT bi.*, AVG(r.Stars) AS Avg_Rating, MIN(r.Stars) AS Min_Rating, MAX(r.Stars) AS Max_Rating, 0 AS Better_Food, 0 AS Cleaner
      FROM reviews r JOIN (
          SELECT b.Business_Id, b.Name, b.Address, b.Stars, b.Review_Count, b.Categories, i.Current_Demerits, i.Current_Grade
          FROM business b JOIN inspection i ON b.Name = i.restaurant_name
          WHERE b.Business_Id = '${id1}' AND ROWNUM <= 1
          ) bi ON bi.business_id = r.business_id
      GROUP BY bi.Business_Id, bi.Name, bi.Address, bi.Stars, bi.Review_Count, bi.Categories, bi.Current_Demerits, bi.Current_Grade
  )
  UNION
  (
      SELECT bi.*, AVG(r.Stars) AS Avg_Rating, MIN(r.Stars) AS Min_Rating, MAX(r.Stars) AS Max_Rating, 0 AS Better_Food, 0 AS Cleaner
      FROM reviews r JOIN (
          SELECT b.Business_Id, b.Name, b.Address, b.Stars, b.Review_Count, b.Categories, i.Current_Demerits, i.Current_Grade
          FROM business b JOIN inspection i ON b.Name = i.restaurant_name
          WHERE b.Business_Id = '${id2}' AND ROWNUM <= 1
          ) bi ON bi.business_id = r.business_id
      GROUP BY bi.Business_Id, bi.Name, bi.Address, bi.Stars, bi.Review_Count, bi.Categories, bi.Current_Demerits, bi.Current_Grade
  )
), Compared AS (
  (
      SELECT c.Business_Id, c.Name, c.Address, c.Stars, c.Review_Count, c.Categories, c.Current_Demerits, c.Current_Grade, c.Avg_Rating, c.Min_Rating, c.Max_Rating, 1 AS Better_Food, c.Cleaner
      FROM Combined c 
      WHERE c.Stars >= ALL (SELECT Stars FROM Combined)
  )
  UNION
  (
      SELECT c.Business_Id, c.Name, c.Address, c.Stars, c.Review_Count, c.Categories, c.Current_Demerits, c.Current_Grade, c.Avg_Rating, c.Min_Rating, c.Max_Rating, c.Better_Food, 1 AS Cleaner
      FROM Combined c 
      WHERE c.Current_Demerits <= ALL (SELECT Current_Demerits FROM Combined)
  )
  UNION
  (
      SELECT * FROM Combined
  )
)
SELECT c.Business_Id, c.Name, c.Address, c.Stars, c.Review_Count, c.Categories, c.Current_Demerits, c.Current_Grade, c.Avg_Rating, c.Min_Rating, c.Max_Rating, MAX(c.Better_Food) AS Better_Food, MAX(c.Cleaner) AS Cleaner
FROM Compared c
GROUP BY c.Business_Id, c.Name, c.Address, c.Stars, c.Review_Count, c.Categories, c.Current_Demerits, c.Current_Grade, c.Avg_Rating, c.Min_Rating, c.Max_Rating
    `;
    req._oracledb
      .execute(sql)
      .then((restaurantData) => {
        if (restaurantData.rows.length < 2) {
          throw new Error('Incorrect ids');
        }
        res.json({ successful: true, message: '', restaurantData });
      })
      .catch((err) => {
        res.json({ successful: false, message: err.message });
      });
  }
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
  var selectedStar = req.params.selectedStar;
  const sql = `SELECT * FROM ( SELECT DISTINCT b.Name as name, b.Stars as stars, i.current_grade as grade, b.Address as address
  FROM Business b Join Inspection i ON b.name = i.restaurant_name
  WHERE i.current_grade <= '${selectedGrade}' AND b.Stars >= ${selectedStar}
  ORDER BY stars DESC, i.current_grade ASC )
  WHERE ROWNUM <= 90 `;
  req._oracledb
    .execute(sql)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
}

function preferences(req, res) {
  var uname = req.params.username;
  var price = req.params.price;
  var takeout = req.params.takeout;
  var outdoor = req.params.outdoor;
  var credit = req.params.credit;
  console.log(uname);
  const sql_pref = `SELECT name, address, business_id compat FROM(
SELECT B.business_id, B.name, B.address, B.takeout, b.outdoor, b.credit, b.price_range, (B.takeout * ${takeout} + B.outdoor * ${outdoor} + b.price_range * ${price} + b.credit * ${credit}) as compat
FROM business B
WHERE ROWNUM <= 10
ORDER BY compat DESC)`;
  req._oracledb
    .execute(sql_pref)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
}

function saveRecs0(req, res){
  var uname = req.params.username;
  var rec = req.params.recID0;
  const sql = `INSERT INTO user_history (username, restaurant) VALUES ('${uname}', '${rec}')`;
  console.log(sql);
  console.log('HERE!')
  req._oracledb
    .execute(sql)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
}

function saveRecs1(req, res){
  var uname = req.params.username;
  var rec = req.params.recID1;
  const sql = `INSERT INTO user_history (username, restaurant) VALUES ('${uname}', '${rec}')`;
  console.log(sql);
  console.log('HERE!')
  req._oracledb
    .execute(sql)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
}

function saveRecs2(req, res){
  var uname = req.params.username;
  var rec = req.params.recID2;
  const sql = `INSERT INTO user_history (username, restaurant) VALUES ('${uname}', '${rec}')`;
  console.log(sql);
  console.log('HERE!')
  req._oracledb
    .execute(sql)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
}

function getUserHistory(req, res){
  var uname = req.params.username;

  const sql = `SELECT DISTINCT B.name FROM (SELECT restaurant FROM user_history U WHERE U.username = '${uname}') A JOIN Business B ON B.business_id = A.restaurant WHERE ROWNUM <= 10`;
  req._oracledb
    .execute(sql)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  test,
  compare,
  getGrades,
  bestRestsForGrade,
  preferences,
  saveRecs0,
  saveRecs1,
  saveRecs2,
  getUserHistory
};
