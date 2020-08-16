const express = require('express');
const app = express();
//const Sequelize = require('sequelize');
//const pg = require('pg');
const morgan = require('morgan');
const { db } = require('./db');


app.use(morgan('dev'));
app.use(express.json());

app.use(express.static('public'));

app.use('/api', require('./apiRoutes'));

const PORT = 3030;

const init = async () => {
  await db.sync();
  console.log('connected to database');
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}

init();
