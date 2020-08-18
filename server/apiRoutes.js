const express = require('express');
const app = express();
const router = express.Router();
const { db, Friend } = require('./db');

router.get('/', async (req, res, next) => {
  try {
    const data = await Friend.findAndOrder();
    res.json(data);
  } catch(err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    //if (req.body.name === '') throw `Name cannot be empty`;
    await Friend.create({
      name: req.body.name
    });
    res.redirect('/');
  } catch(err) { next(err) }
});

router.put('/:id', async (req, res, next) => {
  try {
    const friend = await Friend.findOne({ where: { id: req.params.id } });
    console.log(req.body);
    req.body.type === 'add' ? friend.add() : friend.subtract();
    const data = await Friend.findAndOrder();
    res.send(data)
  } catch(err) {next(err)};
});

router.put('/:id', async (req, res, next) => {
  try {
    let friend = await Friend.findOne({ where: { id: req.params.id } });
    console.log(req.body);
    req.body.type === 'add' ? friend.add() : friend.subtract();
    const data = await Friend.findAndOrder();
    res.send(data)
  } catch(err) {next(err)};
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Friend.destroy({ where: { id: req.params.id } });
    const data = await Friend.findAndOrder();
    res.send(data)
  } catch(err) {next(err)};
})

module.exports = router;
