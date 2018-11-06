const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById("toy-collection")
let addToy = false

//Step 2
document.addEventListener('DOMContentLoaded', function(){
  fetchAllToys()
  addFormListener()
})

function fetchAllToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(result => {
  result.forEach(toy => appendToy(toy))
    });
}

function appendToy(elem){
  const toyDiv = document.createElement('div')
  toyDiv.className = 'card'
  const name = `<h2>${elem.name}</h2>`
  toyDiv.innerHTML += name
  const img = `<img src ='${elem.image}' class = 'toy-avatar'>`
  // img.classNmae = 'toy-avatar'
  toyDiv.innerHTML += img
  const likes = `<p>${elem.likes} Likes</p>`
  toyDiv.innerHTML += likes
  var btn = document.createElement("BUTTON")
  btn.className = "like-btn"
  toyDiv.appendChild(btn)
  toyDiv.id = elem.id
  toyCollection.appendChild(toyDiv)

  btn.addEventListener('click', findLikes)
  }

  function findLikes(event) {
    let id = event.target.parentNode.id
    let url = `http://localhost:3000/toys/${id}`
    fetch(url)
      .then(res => res.json())
      .then(result => increaseLikes(url, result.likes))
  }

  function increaseLikes(url, foundLikes) {
    foundLikes++
    console.log(url)
    fetch(url, {
      method: "PATCH",
      headers: {
          "Content-Type" : "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
          {likes: foundLikes
        })
    })
    .then(response => response.json())
    .then(data => changeDOMLikes(data))
  }

  function changeDOMLikes(data) {
    console.log(data)
    const toyId = data.id
    const card = document.getElementById(`${toyId}`)
    let likesTag = card.querySelector('p')
    let likesInnerText = likesTag.innerText.split(" ")[0]
    likesInnerText++
    likesTag.innerText = `${likesInnerText} Likes`
  }

//Add new toy

function addFormListener() {
  toyForm.addEventListener('submit', function(event){
    event.preventDefault()
    postToy()
  })
}

function postToy(){
  let url = 'http://localhost:3000/toys'
  let name = document.querySelector('.add-toy-form :nth-child(2)').value
  let image = document.querySelector('.add-toy-form :nth-child(4)').value

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type" : "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({name: name, image: image, likes: 0})
  })
  .then(response => response.json())
  .then(data => appendToy(data))
}

//
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


// OR HERE!
