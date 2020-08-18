//const { post } = require("../server/apiRoutes");

const friendList = document.getElementById('friend-list');
const createFriend = document.getElementById('create-friend-button');
const friendName = document.getElementById('friend-name');

const generateButtons = (id) => {
  const form = document.createElement('form');
  form.className = 'friend-actions';
  const addButton = document.createElement('button');
  addButton.innerText = '+';
  addButton.id = 'increment-rating';
  const subtractButton = document.createElement('button');
  subtractButton.innerText = '-';
  subtractButton.id = 'decrement-rating';
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'x';
  deleteButton.id = 'delete-friend';
  [addButton, subtractButton, deleteButton].forEach(elem => {elem.formAction = `/api/friends/${id}`});
  form.append(addButton, subtractButton, deleteButton);
  return form;
}

const loadData = (data) => {
  data.forEach( elem => {
    const friend = document.createElement('li');
    const rating = document.createElement('p');
    rating.innerText = elem.rating;
    friend.innerText = elem.name;
    const form = generateButtons(elem.id);
    friend.append(rating, form);
    friendList.appendChild(friend);
  });
}

const getData = async () => {
  const response = await fetch('api/friends');
  const data = await response.json();
  loadData(data);
}
/* createFriend.addEventListener('click', async () => {
  console.log('name:', friendName.value);
  //const name = friendName.value;
  const response = await fetch('/api/friends', {
    method: 'post',
    body: {
      name: friendName.value
    },
    redirect: 'follow'
  })
  const data = await response.json();
}) */

getData();

