const db = require('../config/db');
const Joi = require('joi');

const SubtareasController = {
    getAll: async (req, res) => {
        try {
            const subtareas = await db('subtareas').select('*');
            res.status(200).json(subtareas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getByActivity: async (req, res) => {
        try {
            const { tarea_id } = req.params;
            const subtareas = await db('subtareas')
                .where({ tarea_id })
                .select('*');

            if (!subtareas.length) {
                return res.status(404).json({ mensaje: 'No se encontraron subactividades para esta tarea' });
            }

            res.status(200).json(subtareas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    ,

    findOne: async (req, res) => {
        try {
            const subtarea = await db('subtareas').where({ id: req.params.id }).first();
            if (!subtarea) return res.status(404).json({ error: 'Subtarea no encontrada' });
            res.status(200).json(subtarea);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    save: async (req, res) => {
        const schema = Joi.object({
            titulo: Joi.string().max(100).required(),
            estado: Joi.string().valid('pendiente', 'completada').required(),
            tarea_id: Joi.number().required()
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: 'Datos inválidos', detalles: error.details });

        try {
            const [id] = await db('subtareas').insert(value);
            const nueva = await db('subtareas').where({ id }).first();
            res.status(201).json({ mensaje: 'Subtarea creada', subtarea: nueva });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    toggle: async (req, res) => {
        try {
            const { id } = req.params;

            // 1. Obtener la subactividad
            const sub = await db('subtareas').where({ id }).first();
            if (!sub) return res.status(404).json({ error: 'Subtarea no encontrada' });

            // 2. Cambiar estado
            const nuevoEstado = sub.estado === 'completada' ? 'pendiente' : 'completada';

            // 3. Actualizar en la DB
            await db('subtareas').where({ id }).update({ ...sub, estado: nuevoEstado });

            // 4. Devolver la subactividad actualizada
            const updated = await db('subtareas').where({ id }).first();
            res.status(200).json({ mensaje: 'Estado actualizado', subtarea: updated });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const schema = Joi.object({
            titulo: Joi.string().max(100).required(),
            estado: Joi.string().valid('pendiente', 'completada').required(),
            tarea_id: Joi.number().required()
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: 'Datos inválidos', detalles: error.details });

        try {
            const { id } = req.params;
            const existe = await db('subtareas').where({ id }).first();
            if (!existe) return res.status(404).json({ error: 'Subtarea no encontrada' });

            await db('subtareas').where({ id }).update(value);
            const actualizada = await db('subtareas').where({ id }).first();
            res.status(200).json({ mensaje: 'Subtarea actualizada', subtarea: actualizada });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const existe = await db('subtareas').where({ id }).first();
            if (!existe) return res.status(404).json({ error: 'Subtarea no encontrada' });

            await db('subtareas').where({ id }).del();
            res.status(200).json({ mensaje: 'Subtarea eliminada' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = SubtareasController;
