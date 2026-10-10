# 🚀 Express Mongo Auth API con JWT

Este proyecto consiste en un API REST desarrollada con **Node.js**, **Express** y **Mongoose**, que implementa un sistema completo de autenticación y autorización utilizando **JSON Web Tokens (JWT)** y cifrado de contraseñas con **Bcrypt**. El proyecto se encuentra desplegado en la nube utilizando **Render** y cuenta con un pipeline de integración y despliegue continuo (CI/CD) mediante **GitHub Actions**.

---

## 🗄️ Configuración de la Base de Datos en la Nube

Para el almacenamiento de datos se utiliza un clúster en **MongoDB Atlas**. La cadena de conexión configurada para interactuar con la base de datos `auth_db` es la siguiente:

```env
MONGO_URI=mongodb+srv://Alonso:01102006@cluster0.z8ab90g.mongodb.net/auth_db?retryWrites=true&w=majority
```

---

## ⚙️ Variables de Entorno Requeridas (.env)

Para desplegar el proyecto localmente o en la nube (Render), se deben configurar las siguientes variables en el archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGO_URI=mongodb+srv://Alonso:01102006@cluster0.z8ab90g.mongodb.net/auth_db?retryWrites=true&w=majority
JWT_SECRET=f14e6a1c9843c52190c07232dfb9c0e467d5a910
JWT_EXPIRES_IN=6h
BCRYPT_SALT_ROUNDS=10
```

---

## 💻 Flujo de la Interfaz de Usuario

Al contar con un motor de plantillas integrado, el flujo de autenticación se gestiona directamente desde el navegador web navegando a las siguientes secciones de la interfaz:

*   **Pantalla de Registro:** Permite la creación visual de nuevos perfiles de usuario completando el formulario integrado. Las contraseñas se cifran criptográficamente antes de almacenarse.
*   **Pantalla de Inicio de Sesión:** Valida las credenciales ingresadas, genera el token de sesión JWT de manera interna y concede acceso al ecosistema de la aplicación.
*   **Panel de Perfil (`/me`):** Sección privada que recupera y renderiza dinámicamente la información correspondiente al usuario autenticado mediante la lectura del token.

---

## 🛠️ Instalación y Despliegue Local

1. Clonar el repositorio.
2. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Iniciar el servidor en entorno de desarrollo con recarga automática:
   ```bash
   npm run dev
   ```