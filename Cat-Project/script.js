// Función para cargar imágenes de gatos
function loadCatImages(breedId) {
    const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=6&breed_id=${breedId}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then(async (data) => {
            const imageContainer = document.getElementById("image-container");
            imageContainer.innerHTML = "";

            // Función para generar estrellas basadas en el nivel de una cualidad
            function generateStars(level) {
                const maxStars = 5;
                const filledStars = level; // Puedes ajustar esto según el nivel
                const emptyStars = maxStars - filledStars;
                return "★".repeat(filledStars) + "☆".repeat(emptyStars);
            }

            for (let index = 0; index < data.length; index++) {
                const catImage = data[index];
                const imageUrl = catImage.url;

                // Obtener información de la raza correspondiente
                const breedInfo = await fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`).then(response => response.json());

                // Crear una tarjeta HTML para la imagen con estrellas
                const card = document.createElement("div");
                card.classList.add("image-card");

                const image = document.createElement("img");
                image.src = imageUrl;
                image.alt = "Imagen de un gato";
                image.classList.add("generated-image");

                const title = document.createElement("h3");

                // Construir cadenas de estrellas para cada cualidad
                const adaptabilityStars = generateStars(breedInfo.adaptability);
                const affectionStars = generateStars(breedInfo.affection_level);
                const childFriendlyStars = generateStars(breedInfo.child_friendly);
                const dogFriendlyStars = generateStars(breedInfo.dog_friendly);
                const energyStars = generateStars(breedInfo.energy_level);
                const groomingStars = generateStars(breedInfo.grooming);
                const healthIssuesStars = generateStars(breedInfo.health_issues);
                const intelligenceStars = generateStars(breedInfo.intelligence);
                const sheddingStars = generateStars(breedInfo.shedding_level);

                title.innerHTML = `Gato ${index + 1}<br>
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


// Agrega un event listener para el botón que permite seleccionar la raza
document.getElementById("breedSelect").addEventListener("change", () => {
    const selectedBreedId = document.getElementById("breedSelect").value;
    loadCatImages(selectedBreedId);
    loadCatBreedInfo(selectedBreedId);
});

// Carga la lista de razas de gatos al cargar la página
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
        })
        .catch((error) => {
            console.error("Error fetching cat breeds: " + error.message);
        });
});
