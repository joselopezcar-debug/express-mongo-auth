import bcrypt from 'bcrypt';
import userRepository from '../repositories/UserRepository.js';
import roleRepository from '../repositories/RoleRepository.js';

export default async function seedUsers() {
    try {
        // 1. Verificar si ya existe algún usuario con rol admin
        const allUsers = await userRepository.getAll();
        const hasAdmin = allUsers.some(user => 
            user.roles.some(role => role.name === 'admin')
        );

        if (!hasAdmin) {
            // 2. Obtener el documento del rol 'admin'
            let adminRole = await roleRepository.findByName('admin');
            
            // Por seguridad, si por alguna razón no se ha creado el rol, lo generamos
            if (!adminRole) {
                adminRole = await roleRepository.create({ name: 'admin' });
            }

            // 3. Encriptar la contraseña cumpliendo los requisitos mínimos de seguridad
            const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
            const hashedPassword = await bcrypt.hash('Admin2026@', saltRounds);

            // 4. Crear el usuario administrador base con los nuevos campos obligatorios
            await userRepository.create({
                email: 'admin@tecsup.edu.pe',
                password: hashedPassword,
                name: 'Administrador',
                lastName: 'General',
                phoneNumber: '999888777',
                birthdate: new Date('1990-01-01'),
                address: 'Campus Tecsup',
                url_profile: 'https://unsplash.com',
                roles: [adminRole._id]
            });

            console.log('Seeded User: admin@tecsup.edu.pe creado exitosamente (Password: Admin2026@)');
        }
    } catch (error) {
        console.error('Error al inicializar el usuario administrador:', error);
    }
}