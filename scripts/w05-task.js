/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
let templeList = [];

/* async displayTemples Function */
function displayTemples(templeList) {
  const templeDiv = document.querySelector("#temples");
  templeDiv.innerHTML = ''; // Clear the temple container

  templeList.forEach((temple) => {
    const templeWrapper = document.createElement('div');
    templeWrapper.classList.add('temple-wrapper');

    const templeNameH3 = document.createElement("h3");
    templeNameH3.innerText = temple.templeName;
    templeWrapper.appendChild(templeNameH3);

    const locationP = document.createElement("p");
    locationP.innerText = "Location: " + temple.location;
    templeWrapper.appendChild(locationP);

    const dedicatedP = document.createElement("p");
    dedicatedP.innerText = "Dedicated: " + temple.dedicated;
    templeWrapper.appendChild(dedicatedP);

    const areaP = document.createElement("p");
    areaP.innerText = "Area: " + temple.area + " square feet";
    templeWrapper.appendChild(areaP);

    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = temple.templeName;

    // Add data attributes for future reference
    img.setAttribute('data-location', temple.location);
    img.setAttribute('data-dedicated', temple.dedicated);
    img.setAttribute('data-area', temple.area);

    // Append elements to the temple container
    templeWrapper.appendChild(img);
    templeDiv.appendChild(templeWrapper);
  });
}
/* async getTempleData Function using fetch() */
async function getTempleData() {
  try {
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
    templeList = await response.json();
    if (response.ok) {
      displayTemples(templeList); // Mostrar los templos
    } else {
      console.log("DATA COULD NOT BE FETCHED");
    }
    console.log("TEMPLE DATA:", templeList);
  } catch (error) {
    console.error("Error fetching temple data:", error);
  }
}

/* reset Function */
const reset = () => {
  templesElement.innerHTML = ''; // Clear the temple container
};

/* Function to sort temples */
const sortBy = (temples) => {
  reset();
  const filterValue = document.getElementById('sortBy').value;

  switch (filterValue) {
    case 'utah':
      displayTemples(temples.filter((temple) => temple.location.includes("Utah")));
      break;
    case 'notutah':
      displayTemples(temples.filter((temple) => !temple.location.includes("Utah")));
      break;
    case 'older':
      displayTemples(temples.filter((temple) => new Date(temple.dedicated) < new Date(1950, 0, 1)));
      break;
    case 'all':
    default:
      displayTemples(temples);
      break;
  }
}

/* Event Listener for the Sort By dropdown */
document.getElementById("sortBy").addEventListener("change", () => {
  sortBy(templeList);
});

/* Initialize by fetching temple data */
getTempleData();
