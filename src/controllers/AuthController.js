const db = require('../config/db');
const bcrypt = require('bcryptjs');

const AuthController = {
    login: async (req, res) => {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
        }

        try {
            const usuario = await db('usuarios').where({ correo }).first();
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const match = await bcrypt.compare(contrasena, usuario.contrasena);
            if (!match) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }

            
            res.status(200).json({ mensaje: 'Login exitoso'});
        } catch (error) {
            res.status(500).json({ error: 'Error en el login', detalles: error.message });
        }
    }
};

module.exports = AuthController;
