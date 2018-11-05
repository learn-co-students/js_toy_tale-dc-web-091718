'use strict'
document.addEventListener("DOMContentLoaded", () => {

	fetchToys()


	const addBtn = document.querySelector("#new-toy-btn");
	let addToy = false;
	addBtn.addEventListener("click", (e) => addToyDrawer(e, addToy));
});

let addToyDrawer = function(e, addToy) {
	const toyForm = document.querySelector(".container");
	// hide & seek with the form
	addToy = !addToy;
	if (addToy) {
		toyForm.style.display = "block";
		// submit listener here
	} else {
		toyForm.style.display = "none";
	}
};

function getToyDiv() {
	return document.querySelector('#toy-collection');
}



function fetchToys() {
	fetch('http://localhost:3000/toys')
		.then(resp => resp.json())
		.then(json => {
			let collection = getToyDiv();
			json.forEach(toy => {
				collection.appendChild(renderToy(toy));
			})
		})

}

function renderToy(toy) {
	debugger
	let card = document.createElement('div');
	card.className = 'card';

	let nameEl = document.createElement('h2');
	nameEl.innerText = toy.name;

	let imgEl = document.createElement('img');
	imgEl.src = toy.image;
	imgEl.className = 'toy-avatar';

	let likesEl = document.createElement('p');
	likesEl.innerText = toy.likes;

	let likeBtn = document.createElement('button');
	likeBtn.className = 'like-btn';

	card.append(...[nameEl, imgEl, likesEl, likeBtn]);
	return card;
}

// OR HERE!
