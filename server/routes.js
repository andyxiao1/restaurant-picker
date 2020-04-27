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
    (SELECT b.Business_Id, b.Name, b.Address, b.Stars, b.Review_Count, b.Categories, i.Current_Demerits, i.Current_Grade, 0 AS Better_Food, 0 AS Cleaner
    FROM business b JOIN inspection i ON b.Name = i.restaurant_name
    WHERE b.Business_Id = '${id1}'
            AND ROWNUM <= 1)
    UNION
    (SELECT b.Business_Id, b.Name, b.Address, b.Stars, b.Review_Count, b.Categories, i.Current_Demerits, i.Current_Grade, 0 AS Better_Food, 0 AS Cleaner
    FROM business b JOIN inspection i ON b.Name = i.restaurant_name
    WHERE b.Business_Id = '${id2}'
            AND ROWNUM <= 1)
), Compared AS (
    (SELECT c.Business_Id, c.Name, c.Address, c.Stars, c.Review_Count, c.Categories, c.Current_Demerits, c.Current_Grade, 1 AS Better_Food, c.Cleaner
    FROM Combined c 
    WHERE c.Stars >= ALL (SELECT Stars FROM Combined))
    UNION
    (SELECT c.Business_Id, c.Name, c.Address, c.Stars, c.Review_Count, c.Categories, c.Current_Demerits, c.Current_Grade, c.Better_Food, 1 AS Cleaner
    FROM Combined c 
    WHERE c.Current_Demerits <= ALL (SELECT Current_Demerits FROM Combined))
    UNION
    (SELECT * FROM Combined)
)
SELECT c.Business_Id, c.Name, c.Address, c.Stars, c.Review_Count, c.Categories, c.Current_Demerits, c.Current_Grade, MAX(c.Better_Food) AS Better_Food, MAX(c.Cleaner) AS Cleaner
FROM Compared c
GROUP BY c.Business_Id, c.Name, c.Address, c.Stars, c.Review_Count, c.Categories, c.Current_Demerits, c.Current_Grade
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

// The exported functions, which can be accessed in index.js.
module.exports = {
  test,
  compare,
};
