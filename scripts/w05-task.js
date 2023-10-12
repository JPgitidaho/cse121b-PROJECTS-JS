/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
let templeList = [];

/* Function: displayTemples() */
const displayTemples = (temples) => {
  templesElement.innerHTML = ''; // Clear the temple container

  temples.forEach((temple) => {
    const article = document.createElement('article');
    article.classList.add('temple-card');

    // Create a div for the temple image and styling
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('temple-image');

    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = temple.location;
    imageDiv.appendChild(img);

    article.appendChild(imageDiv);

    // Create a div for temple information
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('temple-info');

    const h3 = document.createElement('h3');
    h3.innerText = temple.templeName;
    h3.style.fontWeight = 'bold'; // Make templeName bold
    h3.style.fontSize = '20px'; // Increase font size for templeName
    infoDiv.appendChild(h3);

    const locationP = document.createElement('p');
    locationP.innerText = "Location: " + temple.location;
    infoDiv.appendChild(locationP);

    const dedicatedP = document.createElement('p');
    dedicatedP.innerText = "Dedicated: " + temple.dedicated;
    infoDiv.appendChild(dedicatedP);

    const areaP = document.createElement('p');
    areaP.innerText = "Area: " + temple.area + " square feet";
    infoDiv.appendChild(areaP);

    article.appendChild(infoDiv);

    templesElement.appendChild(article);
  });
};



/* Function: getTemples() */
const getTemples = async () => {
  try {
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
    templeList = await response.json();
    if (response.ok) {
      displayTemples(templeList);
    } else {
      console.log("DATA COULD NOT BE FETCHED");
    }
    console.log("TEMPLE DATA:", templeList);
  } catch (error) {
    console.error("Error fetching temple data:", error);
  }
};

/* Function: reset() */
const reset = () => {
  templesElement.innerHTML = ''; // Clear the temple container
};

/* Function: sortBy() */
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
    case 'alphabetical':
      displayTemples(temples.slice().sort((a, b) => a.templeName.localeCompare(b.templeName)));
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
getTemples();

/* Function to add the "Alphabetical Order" option */
function addAlphabeticalOption() {
  const sortBySelect = document.getElementById('sortBy');

  const alphabeticalOption = document.createElement('option');
  alphabeticalOption.value = 'alphabetical';
  alphabeticalOption.textContent = 'Alphabetical Order';

  // Insert the option as the last item in the dropdown
  sortBySelect.appendChild(alphabeticalOption);
}

// Call the function to add the "Alphabetical Order" option
addAlphabeticalOption();
