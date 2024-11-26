# ImageIQ 🖼️💡

**ImageIQ** es una aplicación web que permite analizar imágenes usando la API de Hugging Face 🤖. Solo tienes que ingresar la URL de una imagen, y la aplicación te dará una descripción detallada de lo que hay en ella 📄.

## 🚀 Requisitos previos

1. **Navegador web** 🌐: Necesitarás un navegador moderno para usar la aplicación (Google Chrome, Firefox, etc.).
2. **Conexión a Internet** 🌍: La aplicación hace uso de la API de Hugging Face, por lo que necesitas estar conectado a Internet.
3. **API Token de Hugging Face** 🧑‍💻: Debes tener un token de autenticación para interactuar con la API. Puedes obtener uno en [Hugging Face](https://huggingface.co/).

## 📝 ¿Cómo usar ImageIQ?

1. **Accede a la aplicación**: Abre el archivo `index.html` en tu navegador.
2. **Ingresa la URL de la imagen**: Coloca la URL de la imagen en el campo de texto y presiona el botón **Escanear** 🔍.
3. **Obtén la descripción**: La descripción de la imagen aparecerá debajo del formulario. ¡Así de fácil!

## ⚙️ Funcionamiento

### 1. **Petición a la API**

Cuando el usuario ingresa la URL de una imagen y presiona el botón "Escanear", se realiza una petición `POST` a la API de Hugging Face. El código en JavaScript envía la URL de la imagen para obtener una descripción.

Aquí tienes el código JavaScript que hace la petición a la API de Hugging Face:

```javascript
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

        // Verificar si se obtuvo una descripción
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
        scanTextElement.textContent = "Por favor, ingresa una URL de imagen.";
        return;
    }

    // Llamar a la funcion de descripcion de imagen
    scanTextElement.textContent = "Procesando...";
    const description = await describeImage(imageUrl);
    scanTextElement.textContent = description;
});
2. Respuesta de la API
La respuesta de la API es un objeto JSON que contiene la descripción generada de la imagen. A continuación te muestro cómo se recibe la respuesta y qué formato tiene:

json
Copiar código
{
  "generated_text": "A beautiful landscape with mountains and a lake."
}
Este texto es lo que se muestra en la interfaz de usuario, proporcionando una descripción clara de lo que se encuentra en la imagen.

🛠️ Instalación y Uso Local
1. Clona el repositorio:
bash
Copiar código
git clone https://github.com/JuanBuitrago04/ImageIQ.git
2. Navega al directorio del proyecto:
bash
Copiar código
cd ImageIQ
3. Abre el archivo index.html en tu navegador.
4. Ingresa la URL de la imagen y presiona "Escanear".
📡 Cómo recibir la petición y mostrar la descripción
La petición que realizamos con JavaScript interactúa con la API de Hugging Face. Para recibir correctamente la respuesta y mostrarla al usuario, debes tener en cuenta los siguientes pasos:

Realizar la petición: La función describeImage(imageUrl) realiza la solicitud HTTP POST a la API de Hugging Face, enviando como cuerpo de la solicitud el URL de la imagen que el usuario proporciona.
Leer la respuesta: La respuesta de la API se procesa en formato JSON. Si la respuesta contiene un texto generado (generated_text), ese texto se utiliza para mostrar la descripción de la imagen.
Mostrar la descripción: Una vez recibida la respuesta, se muestra la descripción en el HTML de la página.
🧑‍💻 Contribuciones
¡Contribuye! Si tienes ideas o mejoras para este proyecto, siéntete libre de abrir un "issue" o enviar un "pull request". 🚀

📢 Licencia
Este proyecto está bajo la licencia MIT.

r
Copiar código

Este es el contenido completo para tu archivo `README.md`, incluyendo todos los detalles del código para hacer la petición a la API y cómo recibir la respuesta. Puedes copiarlo y pegarlo directamente en tu archivo `README.md`. ¡Espero que te sea útil!
