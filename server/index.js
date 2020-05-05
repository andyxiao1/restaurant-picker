const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const middleware = require('./middleware');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middleware.oracleMiddleware);
app.use(middleware.onFinishMiddleware);

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- Test Route ---- */
app.get('/api/test', routes.test);

/* ---- Head to Head Page ---- */
app.get('/api/compare', routes.compare);

/* ---- Filter Page ---- */
app.get('/filter', routes.getGrades);

app.get('/filter/:selectedGrade/:selectedStar', routes.bestRestsForGrade);


/* ---- Preferences Page ---- */
app.get('/preferences/:username/:price/:credit/:takeout/:outdoor', routes.preferences);

app.get('/preferences/saveRecs0/:username/:recID0', routes.saveRecs0);

app.get('/preferences/saveRecs1/:username/:recID1', routes.saveRecs1);

app.get('/preferences/saveRecs2/:username/:recID2', routes.saveRecs2);

/*_____ User History Page -----*/
app.get('/history/:username', routes.getUserHistory);




const server = app.listen(8081, () => {
  console.log(`Server listening on PORT 8081`);
});

process.on('SIGINT', () => {
  server.close();
  process.exit(1);
});
