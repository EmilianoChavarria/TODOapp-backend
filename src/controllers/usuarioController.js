const express = require('express');
const db = require('../config/db')

const UsuarioController = {
    getAll: async (req, res) => {
        try {
            const usuarios = await db('usuarios').select('*');
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(400).json({error: error.message});
            
        }
    },
    save: async (req, res) => {
        try {
          const [id] = await db('usuarios').insert(req.body);
          const nuevoUsuario = await db('usuarios').where({ id }).first();
          res.status(201).json(nuevoUsuario);
        } catch (error) {
          res.status(400).json({ 
            error: 'Error al crear usuario',
            detalles: error.message
          });
        }
      },
}

module.exports = UsuarioController;