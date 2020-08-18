//const { post } = require("../server/apiRoutes");

//const { get } = require("../server/apiRoutes");

//const { put } = require("../server/apiRoutes");

const friendList = document.getElementById('friend-list');
const createFriend = document.getElementById('create-friend-button');
const friendName = document.getElementById('friend-name');

const generateButton = (type, sign, id) => {
  const button = document.createElement('button');
  button.formAction = `/api/friends/${id}`;
  button.className = `${type}-friend`;
  button.innerText = sign;
  button.type = 'button';
  return button;
}
const generateForm = (id) => {
  const form = document.createElement('form');
  form.className = 'friend-actions';
  const buttons = [ generateButton('increment', '+', id),
    generateButton('decrement', '-', id),
    generateButton('delete', 'x', id) ];
  form.append(...buttons);
  return form;
}

const loadData = (data) => {
  data.forEach( elem => {
    let friend = document.createElement('li');
    let rating = document.createElement('p');
    rating.innerText = elem.rating;
    friend.innerText = elem.name;
    let form = generateForm(elem.id);
    friend.append(rating, form);
    friendList.appendChild(friend);
  });
}

const getData = async () => {
  const response = await fetch('api/friends');
  const data = await response.json();
  loadData(data);
}

const clearElement = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  };
}


friendList.addEventListener('click', async (e) => {
  if (e.target.tagName === 'BUTTON') {
    let response;
    if (e.target.className.includes('increment')) {
      response = await fetch(e.target.formAction, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'add'
        })
      });
      console.log('incremented');
    } else if (e.target.className.includes('decrement')) {
      response = await fetch(e.target.formAction, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'subtract'
        })
      });
      console.log('decremented');
    } else {
      response = await fetch(e.target.formAction, { method: 'delete'});
      console.log('deleted');
    };
    let data = await response.json();
    clearElement(friendList);
    loadData(data);
  }
})

getData();
