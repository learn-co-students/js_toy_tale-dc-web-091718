const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
})

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    document.querySelector('.add-toy-form').addEventListener('submit', createNewToy)
  } else {
    toyForm.style.display = 'none'
  }
})

let fetchToys = function() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toyJson => displayToys(toyJson))
}

let displayToys = function(toys) {
  for(const toy of toys) {
    displayToy(toy);
  }
}

let displayToy = function(toy) {
  let toyCollection = document.querySelector('#toy-collection')

  toyCard = document.createElement('div')
  toyCard.className = "card"
  toyCard.dataset.id = toy.id

  toyName = document.createElement('h2')
  toyName.innerText = toy.name

  toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.className = "toy-avatar"

  toyLikes = document.createElement('p')
  toyLikes.innerText = toy.likes + " Likes"

  toyLikeButton = document.createElement('button')
  toyLikeButton.className="like-btn"
  toyLikeButton.innerText = "Like <3"
  toyLikeButton.addEventListener('click', increaseLikes)
  
  toyCard.appendChild(toyName)
  toyCard.appendChild(toyImage);
  toyCard.appendChild(toyLikes);
  toyCard.appendChild(toyLikeButton);
  toyCollection.appendChild(toyCard);
}

let increaseLikes = function(event) {
  toyCard = event.target.parentElement
  toyId = toyCard.dataset.id

  // Optimistically render likeCount
  likeElement = toyCard.children[2]
  newLikeCount = likeElement.innerText.split(' ')[0]
  newLikeCount++
  likeElement.innerText = (newLikeCount + " Likes")

  // Update likes in DB
  incrementLikes(toyId, newLikeCount)
}

let incrementLikes = function(toyID, newLikeCount) {
  str = 'http://localhost:3000/toys/' + toyId
  fetch(str, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: newLikeCount
    })
  })
}

let createNewToy = function(event) {
  event.preventDefault()
  
  name = document.querySelectorAll('.input-text')[0].value
  image = document.querySelectorAll('.input-text')[1].value
  likes = 0
  dbCreateNewToy({name: name, image: image, likes: likes})
}

let dbCreateNewToy = function(toyData) {
  fetch('http://localhost:3000/toys/', {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(toyData)
  }).then(displayToy(toyData))
}

