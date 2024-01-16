/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */

const fullName = "Juanita Perez";
let currentYear = 2023;
let profilePicture = "images/placeholder.png"; 

/* Step 3 - Element Variables */
const nameElement = document.getElementById('name');
const foodElement = document.getElementById('food');
const yearElement = document.querySelector('#year');
const imageElement = document.querySelector('img'); 

/* Step 4 - Adding Content*/ 
nameElement.innerHTML = `<strong>${fullName}</strong>`;
yearElement.textContent = currentYear;
imageElement.setAttribute("src", profilePicture);
imageElement.setAttribute("alt", `Profile image of ${fullName}`);

/* Step 5 - Array 

let favoriteFoods = [];

favoriteFoods = ["Pizza", "Sushi", "Burgers", "Ice Cream", "Tacos"];

foodElement.innerHTML = favoriteFoods.join();

let newFavoriteFood = "Pasta";

favoriteFoods.push(newFavoriteFood);

foodElement.innerHTML += "<br>" + favoriteFoods.join();

favoriteFoods.shift();

foodElement.innerHTML += "<br>" + favoriteFoods.join();

favoriteFoods.pop();

foodElement.innerHTML += "<br>" + favoriteFoods.join();


/* Profile Object */
let myProfile = {
  name: "Juanita Pérez",
  photo: "images/placeholder.png",
  favoriteFoods: ["Pasta", "Ice Cream", "Vegetables"],
  hobbies: ["Reading", "Cooking", "Gardening"],
  placesLived: [],
};

/* Populate Profile Object with placesLived objects */
myProfile.placesLived.push(
  {
    place: "🏠 <strong>Rancagua, Chile</strong>",
    length: "25 years",
  },
  {
    place: "🏠 <strong>Tucuman, Argentina</strong>",
    length: "15 years",
  }
);

/* DOM Manipulation - Output */

/* Name */
document.querySelector("#name").textContent = myProfile.name;

/* Photo with attributes */

imageElement.setAttribute("src", myProfile.photo);
imageElement.setAttribute("alt", `Profile of ${myProfile.name}`);

/* Favorite Foods List */
myProfile.favoriteFoods.forEach((food) => {
  let li = document.createElement("li");
  li.textContent = food;
  document.querySelector("#favorite-foods").appendChild(li);
});

/* Hobbies List */
myProfile.hobbies.forEach((hobby) => {
  let li = document.createElement("li");
  li.textContent = hobby;
  document.querySelector("#hobbies").appendChild(li);
});

/* Places Lived DataList */
myProfile.placesLived.forEach((place) => {
  let dt = document.createElement("dt");
  let dd = document.createElement("dd");

  // Use innerHTML to render HTML tags
  dt.innerHTML = place.place;
  dd.textContent = place.length;

  document.querySelector("#places-lived").appendChild(dt);
  document.querySelector("#places-lived").appendChild(dd);
});
