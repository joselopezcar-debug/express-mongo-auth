import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Importación de tus módulos de rutas
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import viewsRoutes from './routes/views.routes.js'; // Rutas de tus páginas ejs

// 2. Importación de las utilidades de bases de datos
import seedRoles from './utils/seedRoles.js';
import seedUsers from './utils/seedUsers.js';

dotenv.config();

// 3. ¡AQUÍ SE INICIALIZA 'app'! (Debe ir antes de cualquier app.use o app.set)
const app = express();

// 4. Configuración para obtener rutas absolutas en módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 5. Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 6. Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Carpeta para archivos estáticos

// 7. Mapeo de Rutas del Sistema
app.use('/', viewsRoutes);         // Muestra las vistas EJS (signIn, signUp, etc.)
app.use('/api/auth', authRoutes);  // Endpoints API de autenticación
app.use('/api/users', userRoutes); // Endpoints API de gestión de usuarios

// Validar estado del servidor
app.get('/health', (req, res) => res.status(200).json({ ok: true }));

// Manejador de páginas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).render('404');
});

// Manejador global de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor' });
});

// 8. Inicialización y escucha de la base de datos
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, { autoIndex: true })
    .then(async () => {
        console.log('Mongo connected');
        await seedRoles(); // Crea roles base
        await seedUsers(); // Crea administrador base
        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
    })
    .catch(err => {
        console.error('Error al conectar con Mongo:', err);
        process.exit(1);
    });
