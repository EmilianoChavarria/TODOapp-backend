const express = require('express');
const Joi = require('joi');
const db = require('../config/db');
const bcrypt = require('bcryptjs');


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
    const schemaUsuario = Joi.object({
      nombre: Joi.string().max(100).required(),
      email: Joi.string().email().max(100).required(),
      contraseña: Joi.string().min(6).max(100).required(), // clave original
      rol: Joi.string().valid('admin', 'usuario').default('usuario')
    });
  
    const { error, value } = schemaUsuario.validate(req.body);
  
    if (error) {
      return res.status(400).json({
        error: 'Datos inválidos',
        detalles: error.details.map(d => d.message)
      });
    }
  
    try {
      const existe = await db('usuarios').where({ email: value.email }).first();
      if (existe) {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }
  
      const contraseña_hash = await bcrypt.hash(value.contraseña, 10);
  
      const [id] = await db('usuarios').insert({
        nombre: value.nombre,
        email: value.email,
        contraseña_hash,
        rol: value.rol
      });
  
      const nuevoUsuario = await db('usuarios').where({ id }).first();
  
      delete nuevoUsuario.contraseña_hash;
      res.status(201).json(nuevoUsuario);
  
    } catch (err) {
      res.status(400).json({
        error: 'Error al crear usuario',
        detalles: err.message
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