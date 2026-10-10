# 🚀 Express Mongo Auth Web App con JWT

Esta es una aplicación web full-stack desarrollada con **Node.js**, **Express**, **EJS** y **Mongoose**. Implementa un sistema completo de autenticación y autorización visual utilizando **JSON Web Tokens (JWT)** y cifrado de contraseñas con **Bcrypt**. El proyecto se encuentra completamente desplegado en la nube a través de **Render** y cuenta con automatización CI/CD mediante **GitHub Actions**.

---

## 🗄️ Configuración de la Base de Datos en la Nube

Para la persistencia de datos se utiliza un clúster en **MongoDB Atlas**. Por motivos de seguridad y para evitar la filtración de credenciales en el repositorio público, la cadena de conexión se maneja de manera oculta a través de variables de entorno siguiendo esta estructura base:

```env
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.z8ab90g.mongodb.net/auth_db?retryWrites=true&w=majority
```

---

## ⚙️ Guía de Configuración de Variables de Entorno

Para levantar el proyecto localmente o configurar el entorno de producción de forma segura en el dashboard de Render, sigue estos pasos:

1. Localiza el archivo .env.example en la raíz del proyecto.
2. Crea una copia de ese archivo y renombrala exactamente como .env.
3. Abre tu nuevo archivo .env y reemplaza los marcadores <db_username> y <db_password> con tus credenciales personales de MongoDB Atlas. 
   *(Por ejemplo, si tu usuario fuera "Alonso" y tu clave "Clave123", debes reemplazar esos campos exactamente por tus valores, o contáctanos para asignarte un usuario temporal con credenciales de pruebas).*

*Nota: Asegúrate de que el archivo `.env` real esté incluido en tu `.gitignore` para evitar subir tus claves de producción a GitHub.*

---

## 💻 Flujo de la Interfaz de Usuario

Al contar con un motor de plantillas integrado, el flujo de autenticación se gestiona directamente desde el navegador web navegando a las siguientes secciones de la interfaz:

*   **Pantalla de Registro:** Permite la creación visual de nuevos perfiles de usuario completando el formulario integrado. Las contraseñas se cifran criptográficamente antes de almacenarse.
*   **Pantalla de Inicio de Sesión:** Valida las credenciales ingresadas, genera el token de sesión JWT de manera interna y concede acceso al ecosistema de la aplicación.
*   **Panel de Perfil (`/me`):** Sección privada que recupera y renderiza dinámicamente la información correspondiente al usuario autenticado mediante la lectura del token.

---

## 🛠️ Instalación y Ejecución Local

1. Clonar este repositorio.
2. Instalar el árbol completo de dependencias de Node:
   ```bash
   npm install
   ```
3. Iniciar el servidor local en modo de desarrollo con recarga automática:
   ```bash
   npm run dev
   ```
