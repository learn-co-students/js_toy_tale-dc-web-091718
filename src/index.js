//When the page loads, make a 'GET' request to fetch all the toy objects.
document.addEventListener("DOMContentLoaded", () => {
  getToys()

})


//On the index.html page, there is a div with the id "toy-collection"
//When the page loads, make a 'GET' request to fetch all the toy objects.
//With the response data, make a <div class="card"> for each toy and
//add it to the toy-collection div.

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

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

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => {
    document.querySelector('#toy-collection').innerHTML = ""
    data.forEach(toy => {
      renderToys(toy)
    });
  })
}
//takes in toy from fetching
function renderToys(toy) {
  let toyCollection = document.getElementById("toy-collection")
  let div = document.createElement('div')
  div.className = "card"
  div.id = `${toy.id}`

  let name = document.createElement('h2')
  name.innerHTML = `${toy.name}`

  let image = document.createElement('img')
  image.className = "toy-avatar"
  image.src = `${toy.image}`

  let likes = document.createElement('likes')
  likes.innerHTML = `${toy.likes} likes`

  let button = document.createElement('button')
  button.className = "like-btn"
  button.innerHTML = "Like <3"
  button.addEventListener('click', increaseLike)

toyCollection.appendChild(div)
div.appendChild(name)
div.appendChild(image)
div.appendChild(likes)
div.appendChild(button)

let inputForm = document.querySelector(".add-toy-form")
inputForm.addEventListener('submit', postToys)

}

function postToys(event) {
 let url = "http://localhost:3000/toys"
 let name = document.querySelectorAll('.input-text')[0].value
 let img = document.querySelectorAll('.input-text')[1].value
 event.preventDefault()
 let data = {
   "name": name,
   "image": img,
   "likes": 0
 }
 fetch(url, {
   method: "POST",
   headers: {
     "Content-Type" : "application/json",
   },
   body: JSON.stringify(data)
 })
  .then(response => response.json())
  .then(toy => {
     getToys()
   })
 }

function increaseLike(event) {
  //find the ID of the div card that was clicked
  let cards = event.target.parentNode
  let likeId = cards.id
  //creating url for PATCH req
  let url = `http://localhost:3000/toys/${likeId}`

  //select likes tag from div card
  let like = cards.querySelector('likes')
  //only grab number from like tag innertext '2 likes'
  let onlyNumber = parseInt(like.innerHTML)
  onlyNumber++

  let data = {
    "likes": onlyNumber
  }
  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then(resp => resp.json())
  .then(toy => {
    like.innerText = `${onlyNumber} likes`
    getToys()
  })
}








// function toyUrl() {
//   return `http://localhost:3000/toys`
// }
//
// function getToys() {
//   fetch(toyURL())
//   .then(resp => resp.json())
//   .then(toys => render(toys))
// }
//
// function render(toys) {
//   toys.map(toy => toyContainer().appendChild(toyCard(toy)))
// }
//
// function toyCard(toy) {
//   let card = document.createElement('div')
//   card.className = "card"
//
//   let name = document.createElement('h2')
//   name.innerText = `${toy.name}`
//
//   let img = document.createElement('img')
//   img.className = "toy-avatar"
//   img.src = `${toy.image}`
//
//   let p = document.createElement('p')
//   p.innerText = `${toy.likes} Likes`
//
//   let button = document.createElement('button')
//   button.className = "like-btn"
//   button.innerText = "Like <3"
//
//   card.appendChild(name)
//   card.appendChild(img)
//   card.appendChild(p)
//   card.appendChild(button)
//
//   return card
// }




















// OR HERE!
