/* Profile Object */
const myProfile = {
  name: "Juanita Pérez",
  photo: "images/placeholder.png",
  favoriteFoods: [
    "Pasta",
    "Ice Cream",
    "Vegetables",
  ],
  hobbies: [
    "Reading",
    "Cooking",
    "Gardening",
  ],
  placesLived: [],
};

/* Populate Profile Object with placesLived objects */
myProfile.placesLived.push(
  {
    place: "Rancagua, Chile",
    length: "25 years",
  },
  {
    place: "Argentina",
    length: "15 years",
  }
);

/* DOM Manipulation - Output */

/* Name */
document.querySelector("#name").textContent = myProfile.name;

/* Photo with attributes */
const imageElement = document.querySelector("img");
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
  dt.textContent = place.place;
  dd.textContent = place.length;

  document.querySelector("#places-lived").appendChild(dt);
  document.querySelector("#places-lived").appendChild(dd);
});
