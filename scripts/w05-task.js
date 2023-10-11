/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");

let templeList = []; 



/* async displayTemples Function */


const displayTemples = (templeList) => {

  // Clear existing output
  templesElement.innerHTML = '';

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
    article.
   
appendChild(h3);
    article.appendChild(img);

    // Append the article to the global container
    templesElement.appendChild(article);
  });
};


/* async getTemples Function using fetch()*/

const getTemples = async () => {
    try {

        const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");

    

   
if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    templeList = data;

    

    templeList =


displayTemples(templeList);
  } catch (error) {
    console.error("Error fetching temple data:", error);
  }
};
    
/* reset Function */
const reset = () => {
    templesElement.innerHTML = '';
  };

/* sortBy Function */
const sortBy = (temples) => {
    // Clear existing output
    reset();



/* Event Listener */
const filterSelect = document.getElementById('filter');
filterSelect.
filterSelect
addEventListener('change', () => {
  sortBy(templeList);
});

// Call the function to fetch temple data when the page loads
getTemples();

switch (filterValue) {
    case 'utah':
      displayTemples(temples.filter((temple) => temple.location.includes("Utah")));
      break;
    case 'nonutah':
      displayTemples(temples.filter((temple) => !temple.location.includes("Utah")));
      break;
    case 'older':
      
      displayTemp
displayTemples(temples.filter((temple) => new Date(temple.dedicated) < new Date(1950, 0, 1)));
      break;
    case 'all':
    default:
      displayTemples(temples);
      break;
  }
};