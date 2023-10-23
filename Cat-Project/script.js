// Función para cargar imágenes de gatos al hacer clic en el botón
document.getElementById("loadImageButton").addEventListener("click", () => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=6") // Puedes ajustar el límite aquí
        .then((response) => response.json())
        .then((data) => {
            const imageContainer = document.getElementById("image-container");
            imageContainer.innerHTML = ""; // Limpia el contenido anterior

            // Limita el número de imágenes a 6
            data.slice(0, 6).forEach((catImage) => {
                const imageUrl = catImage.url;
                const image = document.createElement("img");
                image.src = imageUrl;
                image.alt = "Imagen de un gato";
                image.classList.add("generated-image"); // Asignar la clase para aplicar estilos
                imageContainer.appendChild(image);
            });
        })
        .catch((error) => {
            console.error("Error fetching cat images: " + error.message);
        });
});