Aquí tienes el archivo `README.md` actualizado con el enlace a la API en Render:

````markdown
# API RESTful para Gestión de Posts y Usuarios

Este proyecto es una API RESTful construida con Node.js, Express, y MongoDB.
Permite gestionar usuarios y posts, con funcionalidad para crear, leer,
actualizar y eliminar (CRUD) tanto posts como usuarios. La API también
implementa autenticación y autorización mediante JWT y emplea una arquitectura
limpia para el diseño del código.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para construir aplicaciones web en Node.js.
- **MongoDB**: Base de datos NoSQL para almacenar datos.
- **Mongoose**: Biblioteca para interactuar con MongoDB desde Node.js.
- **JWT (JSON Web Token)**: Para autenticación y autorización de usuarios.
- **bcryptjs**: Para el hashing de contraseñas y asegurar que las contraseñas de
  los usuarios estén cifradas.
- **http-errors**: Para manejar errores HTTP de manera eficiente.
- **dotenv**: Para cargar variables de entorno desde un archivo `.env`.
- **Clean Architecture**: Para mantener una estructura de código organizada y
  escalable.

## Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone http://git@github.com:JarolGabriel/node-express-posts-users.git
   cd node-express-posts-users
   ```
````

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**: Crea un archivo `.env` en la raíz del
   proyecto y añade las siguientes variables:

   ```plaintext
   DB_USER=<TU_USUARIO_DE_BASE_DE_DATOS>
   DB_PASSWORD=<TU_CONTRASEÑA_DE_BASE_DE_DATOS>
   DB_HOST=<HOST_DE_TU_BASE_DE_DATOS>
   DB_NAME=<NOMBRE_DE_TU_BASE_DE_DATOS>
   JWT_SECRET=<TU_SECRETO_DE_JWT>
   ```

4. **Iniciar la aplicación**:
   ```bash
   npm start
   ```

## Rutas de la API

### **Usuarios**

- **POST /users/signup**

  - Crea un nuevo usuario.
  - **Requiere**: `name`, `email`, `password`

- **POST /users/login**
  - Autentica un usuario y devuelve un token JWT.
  - **Requiere**: `email`, `password`

### **Posts**

- **POST /posts**

  - Crea un nuevo post.
  - **Requiere**: `title`, `image`, `body`, `author` (ID del autor)

- **GET /posts**

  - Obtiene todos los posts.
  - **Query Params**: `search` (opcional para filtrar por título)

- **PATCH /posts/:id**

  - Actualiza un post existente.
  - **Requiere**: Autenticación (token JWT)
  - **No permite**: Cambiar el autor del post

- **DELETE /posts/:id**
  - Elimina un post existente.
  - **Requiere**: Autenticación (token JWT)
  - **Solo permite**: Eliminar el post si el usuario es el autor

## Documentación de la API

Puedes acceder a la API desplegada en Render a través del siguiente enlace:

[API en Render](https://node-express-posts-users-api.onrender.com)

## Ejemplos de Uso

### Crear un Usuario

```bash
curl -X POST http://localhost:8080/users/signup \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "john.doe@example.com", "password": "password123"}'
```

### Iniciar Sesión

```bash
curl -X POST http://localhost:8080/users/login \
-H "Content-Type: application/json" \
-d '{"email": "john.doe@example.com", "password": "password123"}'
```

### Crear un Post

```bash
curl -X POST http://localhost:8080/posts \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN_JWT>" \
-d '{"title": "New Post", "image": "https://example.com/image.jpg", "body": "Post content.", "author": "<USER_ID>"}'
```

### Eliminar un Post

```bash
curl -X DELETE http://localhost:8080/posts/<POST_ID> \
-H "Authorization: Bearer <TOKEN_JWT>"
```

## Contribuciones

Si deseas contribuir a este proyecto, por favor, sigue estos pasos:

1. **Haz un fork** del repositorio.
2. **Crea una rama** para tu característica o corrección de errores.
3. **Realiza los cambios** y haz commits descriptivos.
4. **Envía un pull request** con una descripción clara de tus cambios.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---

¡Gracias por tu interés en este proyecto! Si tienes alguna pregunta o problema,
no dudes en abrir un issue en el repositorio.
