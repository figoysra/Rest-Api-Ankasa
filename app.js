const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const usersRouter = require('./src/routers/users');
const countryRouter = require('./src/routers/country');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(usersRouter);
app.use(countryRouter);

app.listen(8000, () => {
  console.log('service running on port 8000');
});
