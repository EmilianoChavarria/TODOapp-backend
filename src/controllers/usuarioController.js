const express = require('express');
const db = require('../config/db');
const e = require('express');

const UsuarioController = {
  getAll: async (req, res) => {
    try {
      const usuarios = await db('usuarios').select('*');
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(400).json({ error: error.message });

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
  findOne: async (req, res) => {
    try {
      const usuario = await db('usuarios').where({ id: req.params.id }).first();
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(usuario);

    } catch (error) {
      res.status(500).json({ error: 'Error al buscar usuario', detalles: error.message });
    }
  }
}

module.exports = UsuarioController;