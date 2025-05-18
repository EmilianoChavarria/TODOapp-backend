
const express = require('express');
const db = require('../config/db')

const CategoriasController = {
    getAll: async (req, res) => {
        try {
            const categorias = await db('categorias').select('*');
            res.status(200).json(categorias);
        } catch (error) {
            res.status(400).json({ error: error.message });

        }
    },
}

module.exports = CategoriasController;