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


// OR HERE!
  document.addEventListener('DOMContentLoaded',function(){
      getAllToys()
      // createNewToyListener()
      toyForm.addEventListener('submit',function(event){
          event.preventDefault()
            let formData = document.querySelectorAll('.input-text')
              postNewToy(formData)
              patchNewLike(formData)
      })
  })

  //--------- GET Fetch call to obtain api data, then callback to display toys-------//
  function getAllToys(){
    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(toys => {
      toys.forEach(toy=>displayAllToys(toy))
      })
  }
  //--------- displaly all Toys on their cards-------//
  function displayAllToys(toy){

    let grab_toy_collection = document.getElementById('toy-collection');
    //--------- Create Card and append to toy-collection-------//
    let createCard = document.createElement("div");
    createCard.className = 'card'
    grab_toy_collection.appendChild(createCard);

    //--------- Create Name Node and append to card-------//
    let createName = document.createElement("h2");
    createCard.appendChild(createName);
    createName.innerHTML = toy.name

    //--------- Create Image Node and append to card-------//
    let createImage = document.createElement("img");
    createImage.classList.add('toy-avatar')
    createImage.src = toy.image
    createCard.appendChild(createImage);

    //--------- Create Likes Node and append to card-------//
    let createLikes = document.createElement("p");
    createCard.appendChild(createLikes);
    createLikes.innerHTML = `${toy.likes} likes`

    //--------- Create Like Button and append to card-------//
    let createLikeButton = document.createElement("BUTTON")
    createLikeButton.className = 'like-btn'
    createCard.appendChild(createLikeButton)
    createLikeButton.innerHTML = "Like"
    createLikeButton.addEventListener("click",function(event){
      currentLikes = createLikes.innerHTML
      currentLikes = parseInt(currentLikes)
      currentLikes = currentLikes+1
      createLikes.innerHTML = `${currentLikes} likes`
      toy.likes = currentLikes
      patchNewLike(toy)
    })

  }

  function postNewToy(formData) {

    let toyName = formData[0].value
    let toyImage = formData[1].value

     fetch(`http://localhost:3000/toys`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name:toyName,image:toyImage,likes:"0"}),
    })

    .then(response => response.json()) // parses response to JSON
    .then(response => {
      displayAllToys(response)
    });
  }

  function patchNewLike(formData) {
    debugger
     fetch(`http://localhost:3000/toys/${formData.id}`, {
        method: "PATCH",

        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({likes:`${formData.likes}`}),
    })

    .then(response => response.json()) // parses response to JSON
    .then(response => {
      displayAllToys(response)
    });
  }
