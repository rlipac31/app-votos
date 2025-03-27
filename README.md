# Backend de App de Votación en Línea

Este es el backend para una aplicación de votación en línea, desarrollado con Node.js, Express y MongoDB.

## Descripción

Este backend permite a los usuarios crear encuestas, votar en ellas y ver los resultados en tiempo real. Utiliza una arquitectura RESTful para facilitar la comunicación con el frontend.

**Imagen del Frontend:**

![Imagen del Frontend App-Votar]("https://res.cloudinary.com/rlipac/image/upload/v1743039674/votos_degbfu.png")  


## Características Principales

* Creación de encuestas: Los usuarios pueden crear nuevas encuestas con múltiples opciones.
* Votación segura: Implementación de mecanismos para prevenir el doble voto y garantizar la integridad de los resultados.
* Resultados en tiempo real: Visualización de los resultados de las encuestas a medida que los usuarios votan.
* Autenticación de usuarios: Sistema de autenticación para proteger el acceso a la creación y gestión de encuestas.
* API RESTful: Diseño de una API clara y documentada para la comunicación con el frontend.

## Tecnologías Utilizadas

* **Node.js**: Entorno de ejecución de JavaScript para el backend.
* **Express**: Framework web para Node.js que facilita la creación de la API REST.
* **MongoDB**: Base de datos NoSQL para almacenar la información de las encuestas y los votos.
* **Mongoose**: ODM (Object Data Modeling) para interactuar con MongoDB de manera más sencilla.
* **JWT (JSON Web Tokens)**: Para la autenticación y autorización de usuarios.
* [Otras tecnologías relevantes, como librerías de seguridad, herramientas de testing, etc.]

## Requisitos

* Node.js (versión mínima recomendada)
* npm (o yarn)
* MongoDB (instalado localmente o una instancia en la nube)

## Instalación

1.  Clona el repositorio:

    ```bash
    git clone [https://github.com/rlipac31/app-votos.git](https://github.com/rlipac31/app-votos.git)
    ```

2.  Navega al directorio del proyecto:

    ```bash
    cd app-votos
    ```

3.  Instala las dependencias:

    ```bash
    npm install
    ```

4.  Configura las variables de entorno:

    * Crea un archivo `.env` en la raíz del proyecto.
    * Define las variables necesarias, como la URL de la base de datos de MongoDB, la clave secreta para JWT, etc.

    ```
    PORT= tu puerto
    USER= Nombre de usuario de tu bd
    PASSS=contraseña
    CONECCTION_BD_LOCAL=url_local
    CONECCTION_BD=url de conexión de tu bd en producción
    PRIVATE_KEY_WORD=tu palabra secreta
    #Clorudinary servicio de storage imagenes
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    #variable de entorno cloudinary
    CLOUDINARY_URL=
    ```

5.  Inicia el servidor:

    ```bash
    npm start
    ```

## Endpoints de la API

* `POST /api/candidatos`: Crea un candidato.
    * Parámetros: `nameCandidato`, (puede revisar el modelo Candidato en la carpeta models).
    * Respuesta: `{ id: "...", }`
* `GET /api/candidato/:id`: Obtiene los detalles del candidato específico.
    * Parámetros: `id` (ID del candidato)
    * Respuesta: `{ id: "...", titulo: "...", opciones: [...], resultados: [...] }`
* `POST /api/votos`: Registra un voto en una encuesta.
    * Parámetros: `candidatoId`, `opcion`.
    * Respuesta: `{ mensaje: "Voto registrado con éxito" }`

## Pruebas
**
*** Ejecuta las pruebas unitarias:

    ```bash
    npm test
    ```

## Contribución

[Si estás abierto a contribuciones, explica cómo otros desarrolladores pueden colaborar en tu proyecto. Incluye información sobre cómo reportar errores, sugerir mejoras o enviar pull requests.]

## Autor

* Richard Lipa Cochachi - [rlipac31](https://github.com/rlipac31)

## Licencia

MIT