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
    const newFriend = await Friend.create({
      name: req.body.name
    });
    res.json(newFriend);
  } catch(err) { next(err) }
});

router.put('/:id', async (req, res, next) => {
  try {
    const friend = await Friend.findOne({ where: { id: req.params.id } });
    req.body.type === 'add' ? friend.add() : friend.subtract();
    const data = await Friend.findAndOrder();
    res.send(data)
  } catch(err) {next(err)};
});

router.put('/:id', async (req, res, next) => {
  try {
    let friend = await Friend.findOne({ where: { id: req.params.id } });
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
