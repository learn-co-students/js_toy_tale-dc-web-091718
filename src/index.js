//const addBtn = document.querySelector('#new-toy-btn')
//const toyForm = document.querySelector('.container')
//let addToy = false


document.addEventListener("DOMContentLoaded", () => {
getToys();
let form = document.querySelector('form');
form.addEventListener('submit', newToy);
})


const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})



let allToys;

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => {
    allToys = json;
    displayToys(allToys);
  })
}

function displayToys(allToys) {
  let container = document.getElementById('toy-collection');
  container.innerHTML = '';
  allToys.forEach((toy) => {
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let button = document.createElement('button');

    div.className = "card";
    div.dataset.id = `${toy.id}`;
    h2.innerHTML = toy.name;
    img.src = toy.image;
    img.className = 'toy-avatar';
    p.innerHTML = `Likes ${toy.likes}`;
    button.className = "like-btn";
    button.innerHTML = "Like"
    button.addEventListener('click', likeToy);

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(button);
    container.appendChild(div);
  });
}


function newToy(event) {
  event.preventDefault();
  let name = event.currentTarget.name.value;
  let image = event.currentTarget.image.value;
  postToy(name, image)
}

function postToy(name, image, likes = 0) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    body: JSON.stringify({name: name, image: image, likes: likes}),
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
    }
  }).then(res => res.json())
  .then(json => {
    allToys.push(json);
    displayToys(allToys);
  })
}

function likeToy(event) {
  let id = event.currentTarget.parentElement.dataset.id;
  let likes = allToys.find((toy) => {return toy.id == id}).likes;
  likes++;
  patchToy({likes: likes}, id);
}

function patchToy(updates, id) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
    }
    })
    .then(res => res.json())
    .then(json => {
      getToys();
    })
}
