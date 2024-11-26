# ImageIQ 🧠

ImageIQ es una aplicación web que permite analizar imágenes usando la API de Hugging Face. Solo tienes que ingresar la URL de una imagen, y la aplicación te dará una descripción detallada de lo que hay en ella.

## Requisitos previos

1. **Navegador web**: Necesitarás un navegador moderno para usar la aplicación (Google Chrome, Firefox, etc.).
2. **Conexión a Internet**: La aplicación hace uso de la API de Hugging Face, por lo que necesitas estar conectado a Internet.
3. **API Token de Hugging Face**: Debes tener un token de autenticación para interactuar con la API. Puedes obtener uno en [Hugging Face](https://huggingface.co).

## ¿Cómo usar ImageIQ?

1. Accede a la aplicación: Abre el archivo `index.html` en tu navegador.
2. Ingresa la URL de la imagen: Coloca la URL de la imagen en el campo de texto y presiona el botón **Escanear**.
3. Obtén la descripción: La descripción de la imagen aparecerá debajo del formulario. ¡Así de fácil!

## ⚙️ Funcionamiento

### 1. Petición a la API

Cuando el usuario ingresa la URL de una imagen y presiona el botón **Escanear**, se realiza una petición `POST` a la API de Hugging Face. El código en JavaScript envía la URL de la imagen para obtener una descripción.

```javascript
const apiUrl = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large";
const token = "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";

// Función para realizar la petición a la API
async function describeImage(imageUrl) {
    try {
        const data = { inputs: imageUrl };

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Respuesta de la API:", result);

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
