const apiUrl = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large";
const token = "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";

// Función para realizar la peticion a la API
async function describeImage(imageUrl) {
    try {
        // Preparar los datos para enviar
        const data = { inputs: imageUrl };

        // Hacer la solicitud a la API
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Leer la respuesta de la API
        const result = await response.json();
        console.log("Respuesta de la API:", result);

        // Verificar si se obtuvo una descripcion
        if (result && result.length > 0 && result[0].generated_text) {
            return result[0].generated_text;
        } else if (result.error) {
            return `Error de la API: ${result.error}`;
        } else {
            return "No se pudo obtener una descripción.";
        }
    } catch (error) {
        console.error("Error al conectar con la API:", error);
        return "Error al procesar la solicitud.";
    }
}

// Evento del boton
document.getElementById("scanButton").addEventListener("click", async () => {
    const imageUrl = document.getElementById("urlMessage").value;
    const scanTextElement = document.getElementById("scanText");

    if (!imageUrl) {
        scanTextElement.textContent = "Por favor, ingresa una URL de una imagen.";
        return;
    }

    // Llamar a la funcion de descripcion de imagen
    scanTextElement.textContent = "Procesando...";
    const description = await describeImage(imageUrl);
    scanTextElement.textContent = description;
});
