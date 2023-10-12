/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
let templeList = [];

/* async displayTemples Function */
function displayTemples(templeList) {
  const templeDiv = document.querySelector("#temples");
  templeDiv.innerHTML = ''; // Clear the temple container

  const templeWrapper = document.createElement('div');
  templeWrapper.classList.add('temple-wrapper');

  templeList.forEach((temple, index) => {
    const templeItem = document.createElement('div');
    templeItem.classList.add('temple-item');

    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = temple.templeName;

    // Add data attributes for future reference
    img.setAttribute('data-location', temple.location);
    img.setAttribute('data-dedicated', temple.dedicated);
    img.setAttribute('data-area', temple.area);

    templeItem.appendChild(img);

    const templeNameH3 = document.createElement("h3");
    templeNameH3.innerText = temple.templeName;
    templeItem.appendChild(templeNameH3);

    const locationP = document.createElement("p");
    locationP.innerText = "Location: " + temple.location;
    templeItem.appendChild(locationP);

    const dedicatedP = document.createElement("p");
    dedicatedP.innerText = "Dedicated: " + temple.dedicated;
    templeItem.appendChild(dedicatedP);

    const areaP = document.createElement("p");
    areaP.innerText = "Area: " + temple.area + " square feet";
    templeItem.appendChild(areaP);

    templeWrapper.appendChild(templeItem);

    // Insert a line break after every third item
    if ((index + 1) % 3 === 0) {
      templeWrapper.appendChild(document.createElement('br'));
    }
  });

  templeDiv.appendChild(templeWrapper);
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
