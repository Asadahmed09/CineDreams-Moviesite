let input = document.querySelector("input");
let button = document.querySelector("#search");
let favourites = document.querySelector("#fav");
let chkFav = document.querySelector("#add");
let rights = document.querySelector("h3");
let a = document.querySelectorAll("a");
rights.style.display = "none";
a.forEach((el=>{
  el.style.display = "none";
}))
let prevMovieName = undefined;
let FavMovieArr = [];
let displayContainer = document.querySelector(".container");
displayContainer.style.display = "none";
let url = "https://www.omdbapi.com/?apikey=thewdb&t=";
// for input value : input.value to get user entered data
button.addEventListener("click", async (event) => {
	event.preventDefault();
	rights.style.display = "block";
  a.forEach((el) => {
		el.style.display = "inline";
	});
	displayContainer.style.display = "flex";
	chkFav.style.display = "block";
	let ul = document.querySelector("ul");
	ul.innerHTML = "";
	let data = input.value;
	prevMovieName = data;
	console.log("Value of data : ", data);
	try {
		let movieName = await fetch(url + data);
		let filterDetails = await movieName.json();
		console.dir(filterDetails);
		let image = document.querySelector("#poster");
		image.src = filterDetails.Poster;
		prevMovieImage = image;
		image.style.display = "block";
		let arr = [];
		for (let i = 0; i < 6; i++) {
			arr.push(document.createElement("li"));
		}
		arr[0].innerHTML = "<b>Actors</b> : " + filterDetails.Actors;
		arr[1].innerHTML = "<b>Genre</b> : " + filterDetails.Genre;
		arr[2].innerHTML = "<b>Language</b> : " + filterDetails.Language;
		arr[3].innerHTML = "<b>Imdb</b> : " + filterDetails.imdbRating;
		arr[4].innerHTML = "<b>Year</b> : " + filterDetails.Year;
		arr[5].innerHTML = "<b>Director</b> : " + filterDetails.Director;
		arr.forEach((el) => ul.appendChild(el));
		//Genre Language imddRating year director
	} catch (err) {
		let error = document.createElement("p");
		error.innerHTML = "No such movie found";
		ul.appendChild(error);
	}
});
chkFav.addEventListener("click", () => {
	console.log("button pressed");
	FavMovieArr.push(prevMovieName);
});
favourites.addEventListener("click", () => {
	let ul = document.querySelector("ul");
	let image = document.querySelector("#poster");
	image.style.display = "none";
	chkFav.style.display = "none";
	ul.innerHTML = "";
	for (movie of FavMovieArr) {
		let li = document.createElement("li");
		li.innerHTML = movie;
		ul.appendChild(li);
	}
});
