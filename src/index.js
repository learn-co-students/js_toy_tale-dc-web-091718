const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyList = document.querySelector('#toy-collection')
let addToy = false

// const toySubmit = document.querySelector('.add-toy-form')
// const newToyName = document.querySelector('#add-toy-form')
// const newToyLink = document.querySelector('#add-toy-form')

function renderToy(x){
  let newToy = document.createElement('div')
  console.log(x.name)
  newToy.setAttribute("class", "card")
  newToy.innerHTML = `<h2>${x.name}</h2>
    <img src=${x.image} class="toy-avatar" />
    <p id="${x.id}_likes">${x.likes} Likes</p>
    <button id="${x.name}" class="like-btn-">Like <3</button>`
  toyList.appendChild(newToy)
  document.getElementById(`${x.name}`).addEventListener('click', () => {
    addLike(x.id)
  })
}

function fetchData(){
  toyList.innerHTML = ""
  let getData = fetch('http://localhost:3000/toys').then(res => res.json()).then(json => showData(json));
}
// YOUR CODE HERE
function showData(data){
  for (x of data){
    renderToy(x)
  }
}

fetchData()

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

toyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.querySelector('.input-text-name')
  let url = document.querySelector('.input-text-url')
  createNewToy(name.value, url.value);
});

function createNewToy(name, url){
  fetch("http://localhost:3000/toys", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },

          body:`{
            "name": "${name}",
            "image": "${url}",
            "likes": 0
          }`
      })
      renderToy({
        "name": "${name}",
        "image": "${url}",
        "likes": 0
      })

}


function addLike(id){
  let likeCounter = document.getElementById(`${id}_likes`)
  let likes = parseInt(likeCounter.innerHTML.split(" "))+1
  console.log(likes)
  fetch(`http://localhost:3000/toys/${id}`, {
          method: "PATCH", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },

          body:`{
            "likes": ${likes}
          }`
      })
    document.getElementById(`${id}_likes`).innerHTML = `${likes} Likes`

}

// OR HERE!
