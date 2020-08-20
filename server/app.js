const express = require('express');
const app = express();
const morgan = require('morgan');
const { db } = require('./db');
const bodyParser = require('body-parser')


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(express.static('client'));

app.use('/api/friends', require('./apiRoutes'));

app.use((err, req, res, next) => {
  console.log(err);
  res.send(`Oops! Something went wrong.
  ${err.message}`);
});

const PORT = process.env.PORT || 3030;

const init = async () => {
  await db.sync();
  console.log('connected to database');
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}

init();
