'use strict'
let toyUrl = 'http://localhost:3000/toys'
document.addEventListener("DOMContentLoaded", () => {

	fetchToys()

	const addBtn = document.querySelector("#new-toy-btn");
	addBtn.addEventListener("click", (e) => addToyDrawer(e));
	
});
let addToy = false;

let addToyDrawer = function(e) {
	// hide & seek with the form
	const toyCont = document.querySelector(".container")

	addToy = !addToy;
	if (addToy) {
		toyCont.style.display = "block";
		getToyForm().addEventListener('submit', onToySubmit);
	} else {
		toyCont.style.display = "none";
	}
};

function getToyDiv() {
	return document.querySelector('#toy-collection');
}

function getToyForm(){
	return document.querySelector(".add-toy-form");
}



function fetchToys() {
	fetch(toyUrl)
		.then(resp => resp.json())
		.then(json => {
			
			json.forEach(toy => {
				renderToy(toy);
			})
		})

}

function renderToy(toy) {
	let collection = getToyDiv();
	let card = document.createElement('div');
	card.className = 'card';

	let nameEl = document.createElement('h2');
	nameEl.innerText = toy.name;

	let imgEl = document.createElement('img');
	imgEl.src = toy.image;
	imgEl.className = 'toy-avatar';

	let likesEl = document.createElement('p');
	likesEl.innerText = toy.likes;
	likesEl.id = "likes-" + toy.id;

	let likeBtn = document.createElement('button');
	likeBtn.className = 'like-btn';
	likeBtn.innerText = 'Like ❤️'
	likeBtn.addEventListener('click', e => likeToy(e, toy))

	card.append(...[nameEl, imgEl, likesEl, likeBtn]);
	collection.appendChild(card)
}

function likeToy(e, toy) {
	toy.likes++

	// fetch(toyUrl + `/${toy.id}`, {
	// 	method: 'patch',
	// 	headers: {
	//   	"Content-Type": "application/json"
	// 	},
	// 	body: JSON.stringify({likes: likesCount})
	// }).then((resp) => resp.json)
	// .then(json=> {
	// 	console.log(json)
	// })

	fetch(toyUrl + `/${toy.id}`, {
    	method: 'PATCH',
   		headers: {
      		"Content-Type": "application/json"
    	},
    	body: JSON.stringify({likes: toy.likes})
  	}).then(res => res.json())
	.then(json => {
		let likeCount = document.querySelector(`#likes-${toy.id}`)
		likeCount.innerHTML++
	})
}

function onToySubmit(e) {
	e.preventDefault()
	
	let newToy = {}
	newToy.name = document.querySelector('#name-input').value;
	newToy.image = document.querySelector('#image-input').value;
	newToy.likes = 0
	getToyForm().reset()
	postToy(newToy)


}

function postToy(toy) {
	fetch(toyUrl, {
		method: 'post',
		headers: {
			"Content-Type": "application/json",
			accept: "application/json"
		},
		body: JSON.stringify(toy)
	}).then(resp => resp.json())
	.then(json => {
		renderToy(json)
	})
}
// OR HERE!
