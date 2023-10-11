/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
let templeList = [];

/* async displayTemples Function */
const displayTemples = (temples) => {
  // Clear existing output
  templesElement.innerHTML = '';

  // Create a wrapper for the temple cards to control layout
  const templeWrapper = document.createElement('div');
  templeWrapper.classList.add('temple-wrapper');

  // Process each temple and create HTML elements
  temples.forEach((temple) => {
    const article = document.createElement('article');
    
    const h3 = document.createElement('h3');
    h3.textContent = temple.templeName;
    
    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.setAttribute('location', temple.location);

    // Append elements to the article
    article.appendChild(h3);
    article.appendChild(img);

    // Append the article to the temple wrapper
    templeWrapper.appendChild(article);
  });

  // Append the temple wrapper to the global container
  templesElement.appendChild(templeWrapper);
};

/* async getTemples Function using fetch() */
const getTemples = async () => {
  try {
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    templeList = data;
    displayTemples(templeList);
  } catch (error) {
    console.error("Error fetching temple data:", error);
  }
};

/* reset Function */
const reset = () => {
  templesElement.innerHTML = '';
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
};

/* Event Listener for the Sort By dropdown */
document.getElementById("sortBy").addEventListener("change", () => {
  sortBy(templeList);
});

/* Initialize by fetching temple data */
getTemples();
