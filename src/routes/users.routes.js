import express from 'express';
// Forzamos la importación exacta asegurando la extensión .js
import UserController from '../controllers/UserController.js'; 
import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = express.Router();

// ==========================================
// Rutas Públicas (No requieren autenticación)
// ==========================================

// POST /api/users/register
router.post('/register', (req, res, next) => UserController.register(req, res, next));

// POST /api/users/login
router.post('/login', (req, res, next) => UserController.login(req, res, next));


// ==========================================
// Rutas Protegidas (Requieren JWT válido)
// ==========================================

// GET /api/users (Solo Admin)
router.get('/', authenticate, authorize(['admin']), (req, res, next) => UserController.getAll(req, res, next));

// GET /api/users/me (Cualquier usuario autenticado)
router.get('/me', authenticate, (req, res, next) => UserController.getMe(req, res, next));

export default router;
