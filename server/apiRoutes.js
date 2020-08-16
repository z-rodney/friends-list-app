const express = require('express');
const app = express();
const router = express.Router();
const { db, Friend } = require('./db');

router.get('/', async (req, res, next) => {
  try {
    const data = await Friend.findAll();
    res.json(data);
  } catch(err) {
    next(err);
  }
})

module.exports = router;
