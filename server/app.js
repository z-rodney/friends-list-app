const express = require('express');
const app = express();
//const Sequelize = require('sequelize');
//const pg = require('pg');
const morgan = require('morgan');
const { db } = require('./db');
const bodyParser = require('body-parser')


app.use(morgan('dev'));
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(express.static('client'));

app.use('/api/friends', require('./apiRoutes'));

app.use((err, req, res, next) => {
  console.log(err, err.stack);
  res.send(err, err.stack);
})

const PORT = process.env.PORT || 3030;

const init = async () => {
  await db.sync();
  console.log('connected to database');
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}

init();
