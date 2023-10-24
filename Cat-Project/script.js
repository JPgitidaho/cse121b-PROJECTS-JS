// Array to store cat breeds
const catBreeds = [];

// Function to load cat images and description with a breed ID
function loadCatImages(breedId) {
    const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=6&breed_id=${breedId}`;

    // Borra el contenido existente en el imageContainer
    const imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = "";

    // Restablece el contenido de la descripción
    const breedDescription = document.getElementById("breedDescription");
    breedDescription.textContent = "";

    fetch(apiUrl)
        .then((response) => response.json())
        .then(async (data) => {
            const imageContainer = document.getElementById("image-container");
            imageContainer.innerHTML = "";

            // Get information about the corresponding breed from the catBreeds array
            const selectedBreed = catBreeds.find((breed) => breed.id === breedId);

            // Update the description for the selected breed
            const breedDescription = document.getElementById("breedDescription");
            breedDescription.textContent = selectedBreed.description;

            // Function to generate stars based on the level of a trait
            function generateStars(level) {
                const maxStars = 5;
                const filledStars = level; // You can adjust this based on the level
                const emptyStars = maxStars - filledStars;
                return "★".repeat(filledStars) + "☆".repeat(emptyStars);
            }

            for (let index = 0; index < data.length; index++) {
                const catImage = data[index];
                const imageUrl = catImage.url;

                // Create an HTML card for the image with stars
                const card = document.createElement("div");
                card.classList.add("image-card");

                const image = document.createElement("img");
                image.src = imageUrl;
                image.alt = "Image of a cat";
                image.classList.add("generated-image");

                const title = document.createElement("h3");

                // Build star strings for each trait
                const adaptabilityStars = generateStars(selectedBreed.adaptability);
                const affectionStars = generateStars(selectedBreed.affection_level);
                const childFriendlyStars = generateStars(selectedBreed.child_friendly);
                const dogFriendlyStars = generateStars(selectedBreed.dog_friendly);
                const energyStars = generateStars(selectedBreed.energy_level);
                const groomingStars = generateStars(selectedBreed.grooming);
                const healthIssuesStars = generateStars(selectedBreed.health_issues);
                const intelligenceStars = generateStars(selectedBreed.intelligence);
                const sheddingStars = generateStars(selectedBreed.shedding_level);

                title.innerHTML = `<br>
                Adaptability: ${adaptabilityStars}<br>
                Affection: ${affectionStars}<br>
                Child Friendly: ${childFriendlyStars}<br>
                Dog Friendly: ${dogFriendlyStars}<br>
                Energy: ${energyStars}<br>
                Grooming: ${groomingStars}<br>
                Health Issues: ${healthIssuesStars}<br>
                Intelligence: ${intelligenceStars}<br>
                Shedding: ${sheddingStars}<br>
                Origin: ${selectedBreed.origin}`;

                card.appendChild(image);
                card.appendChild(title);
                imageContainer.appendChild(card);
            }
        })
        .catch((error) => {
            console.error("Error fetching cat images: " + error.message);
        });
}

// Load the list of cat breeds and load images of a default breed when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://api.thecatapi.com/v1/breeds";
    const breedSelect = document.getElementById("breedSelect");

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Store the list of cat breeds in the catBreeds array
            catBreeds.push(...data);

            data.forEach((breed) => {
                const option = document.createElement("option");
                option.value = breed.id;
                option.textContent = breed.name;
                breedSelect.appendChild(option);
            });

            // Specify the default breed 
            const defaultBreedId = "ragd"; 
            loadCatImages(defaultBreedId); 
        })
        .catch((error) => {
            console.error("Error fetching cat breeds: " + error.message);
        });
});

// Add an event listener for the button that allows selecting the breed
document.getElementById("breedSelect").addEventListener("change", () => {
    const selectedBreedId = document.getElementById("breedSelect").value;
    loadCatImages(selectedBreedId);
});





