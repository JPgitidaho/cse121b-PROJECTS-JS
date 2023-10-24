// Function to load cat images
function loadCatImages(breedId) {
    const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=6&breed_id=${breedId}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then(async (data) => {
            const imageContainer = document.getElementById("image-container");
            imageContainer.innerHTML = "";

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

                // Get information about the corresponding breed
                const breedInfo = await fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`).then(response => response.json());

                // Create an HTML card for the image with stars
                const card = document.createElement("div");
                card.classList.add("image-card");

                const image = document.createElement("img");
                image.src = imageUrl;
                image.alt = "Image of a cat";
                image.classList.add("generated-image");

                const title = document.createElement("h3");

                // Build star strings for each trait
                const adaptabilityStars = generateStars(breedInfo.adaptability);
                const affectionStars = generateStars(breedInfo.affection_level);
                const childFriendlyStars = generateStars(breedInfo.child_friendly);
                const dogFriendlyStars = generateStars(breedInfo.dog_friendly);
                const energyStars = generateStars(breedInfo.energy_level);
                const groomingStars = generateStars(breedInfo.grooming);
                const healthIssuesStars = generateStars(breedInfo.health_issues);
                const intelligenceStars = generateStars(breedInfo.intelligence);
                const sheddingStars = generateStars(breedInfo.shedding_level);

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
                Origin: ${breedInfo.origin}`;

                card.appendChild(image);
                card.appendChild(title);
                imageContainer.appendChild(card);
            }
        })
        .catch((error) => {
            console.error("Error fetching cat images: " + error.message);
        });
}

// Load the list of cat breeds when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://api.thecatapi.com/v1/breeds";
    const breedSelect = document.getElementById("breedSelect");

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((breed) => {
                const option = document.createElement("option");
                option.value = breed.id;
                option.textContent = breed.name;
                breedSelect.appendChild(option);
            });

            // Automatically load images of the first breed in the list
            const selectedBreedId = "";
            loadCatImages(selectedBreedId);
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
