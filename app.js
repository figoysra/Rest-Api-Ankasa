const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const {PORT} = require('./src/helper/env')

const usersRouter = require('./src/routers/users');
const countryRouter = require('./src/routers/country');
const ticketRouter = require('./src/routers/ticket');
const transactionRouter = require('./src/routers/transaction');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(usersRouter);
app.use(countryRouter);
app.use(ticketRouter);
app.use(transactionRouter);

app.listen(PORT, () => {
  console.log(`service running on port ${PORT}`);
});
