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
app.get('/test', routes.test);

/* ---- Head to Head Page ---- */
app.get('/api/headtohead', routes.headtohead);

/* ---- Preferences Page ---- */
app.get('/preferences/:username/:price/:credit/:takeout/:outdoor', routes.preferences);


const server = app.listen(8081, () => {
  console.log(`Server listening on PORT 8081`);
});

process.on('SIGINT', () => {
  server.close();
  process.exit();
});
