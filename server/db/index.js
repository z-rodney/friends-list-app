const Sequelize = require('sequelize');
const pg = require('pg');
const db = new Sequelize('postgres://localhost:5432/friendslistapp', {
  logging: false
});
const { STRING, INTEGER } = Sequelize;

const Friend = db.define('friend', {
  name: {
    type: STRING,
    unique: true,
    allowNull: false
  },
  rating: {
    type: INTEGER,
    defaultValue: 5
  }
 });


 module.exports = {
   db,
   Friend
 }
