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

 Friend.findAndOrder = function(){
   return this.findAll({
     order: [['rating', 'DESC']]
   });

 };

 Friend.prototype.add = function() {
  this.increment('rating', {by: 1});
  this.reload();
 };

 Friend.prototype.subtract = function() {
  this.decrement('rating', {by: 1});
  this.reload();
}

 module.exports = {
   db,
   Friend
 }
