// Array para almacenar razas de gatos
const catBreeds = [];

// Función para cargar imágenes y descripción con un ID de raza
function loadCatImages(breedId) {
    const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=6&breed_id=${breedId}`;

    // Limpia el contenido existente en el contenedor de imágenes
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

            // Obtén información sobre la raza correspondiente desde el array catBreeds
            const selectedBreed = catBreeds.find((breed) => breed.id === breedId);

            // Actualiza la descripción para la raza seleccionada
            const breedDescription = document.getElementById("breedDescription");
            breedDescription.textContent = selectedBreed.description;

            // Función para generar estrellas basadas en el nivel de un rasgo
            function generateStars(level) {
                const maxStars = 5;
                const filledStars = level;
                const emptyStars = maxStars - filledStars;
                return "★".repeat(filledStars) + "☆".repeat(emptyStars);
            }

            data.forEach((catImage) => {
                const imageUrl = catImage.url;

                // Crea una tarjeta HTML para la imagen con estrellas
                const card = document.createElement("div");
                card.classList.add("image-card");

                const image = document.createElement("img");
                image.src = imageUrl;
                image.alt = "Imagen de un gato";
                image.classList.add("generated-image");

                const title = document.createElement("h3");

                // Construye cadenas de estrellas para cada rasgo
                const traitKeys = ["adaptability", "affection_level", "child_friendly", "dog_friendly", "energy_level", "grooming", "health_issues", "intelligence", "shedding_level"];
                const traitTitles = ["Adaptability", "Affection", "Child Friendly", "Dog Friendly", "Energy", "Grooming", "Health Issues", "Intelligence", "Shedding"];
                const traitStars = traitKeys.map((trait, index) => `${traitTitles[index]}: ${generateStars(selectedBreed[trait])}`).join("<br>");

                title.innerHTML = `<br>${traitStars}<br>Origin: ${selectedBreed.origin}`;

                card.appendChild(image);
                card.appendChild(title);
                imageContainer.appendChild(card);
            });
        })
        .catch((error) => {
            console.error("Error al obtener imágenes de gatos: " + error.message);
        });
}

// Carga la lista de razas de gatos y carga imágenes de una raza predeterminada cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://api.thecatapi.com/v1/breeds";
    const breedSelect = document.getElementById("breedSelect");

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Almacena la lista de razas de gatos en el array catBreeds
            catBreeds.push(...data);

            data.forEach((breed) => {
                const option = document.createElement("option");
                option.value = breed.id;
                option.textContent = breed.name;
                breedSelect.appendChild(option);
            });

            // Especifica la raza predeterminada
            const defaultBreedId = "ragd";
            loadCatImages(defaultBreedId);
        })
        .catch((error) => {
            console.error("Error al obtener razas de gatos: " + error.message);
        });
});

// Agrega un event listener para el botón que permite seleccionar la raza
document.getElementById("breedSelect").addEventListener("change", () => {
    const selectedBreedId = document.getElementById("breedSelect").value;
    loadCatImages(selectedBreedId);
});
