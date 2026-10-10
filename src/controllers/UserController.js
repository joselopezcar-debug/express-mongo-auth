import userService from '../services/UserService.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserController {

    // 1. REGISTRO DE USUARIO (Cifrando la contraseña)
    async register(req, res, next) {
        try {
            const { email, password, name, lastName, phoneNumber, birthdate, url_profile, address, roles } = req.body;

            const existingUsers = await userService.getAll();
            const userExists = existingUsers.some(u => u.email === email);
            if (userExists) {
                return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await userService.create({
                email,
                password: hashedPassword,
                name,
                lastName,
                phoneNumber,
                birthdate,
                url_profile,
                address,
                roles
            });

            res.status(201).json({
                message: 'Usuario registrado con éxito.',
                userId: newUser._id
            });
        } catch (err) {
            next(err);
        }
    }

    // 2. INICIO DE SESIÓN (Generando el payload compatible con tu middleware)
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const users = await userService.getAll();
            const user = users.find(u => u.email === email);

            if (!user) {
                return res.status(401).json({ message: 'Credenciales incorrectas.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Credenciales incorrectas.' });
            }

            // Mapeamos el payload EXACTO que tu middleware espera (sub y roles)
            const token = jwt.sign(
                { 
                    sub: user._id, 
                    email: user.email,
                    roles: user.roles // Pasa los roles almacenados en tu modelo
                },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            res.status(200).json({
                message: 'Autenticación exitosa.',
                token
            });
        } catch (err) {
            next(err);
        }
    }

    // 3. OBTENER TODOS (Ruta protegida para Admin)
    async getAll(req, res, next) {
        try {
            const users = await userService.getAll();
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    }

    // 4. OBTENER MI PERFIL (Usa req.userId inyectado por tu middleware)
    async getMe(req, res, next) {
        try {
            const user = await userService.getById(req.userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();
