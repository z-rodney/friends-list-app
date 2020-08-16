const { db, Friend } = require('./index');

const friendsList = [
  {
    name: "Jamal",
    rating: 3
  },

  {
    name: "Marina",
    rating: 5
  },

  {
    name: "Amanda",
    rating: 9
  },

  {
    name: "Mac",
    rating: 8
  },

  {
    name: "Maya",
    rating: 7
  }
];

const seed = async () => {
  try {
    await db.sync({force: true});
    await Friend.bulkCreate(friendsList);
    console.log('seed complete')
  } catch(err) {
    console.error('Something went wrong', err, err.stack);
  } finally {
    db.close();
    console.log('connection closed');
  }
};

seed();


