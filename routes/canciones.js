// routes/canciones.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// Obtener todas las canciones
router.get('/', (req, res) => {
    db.query('SELECT * FROM canciones', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Crear una nueva canción
router.post('/', (req, res) => {
    const { nombre_album, contenido, anio_lanzamiento, artista, duracion } = req.body;
    db.query(
        'INSERT INTO canciones (nombre_album, contenido, anio_lanzamiento, artista, duracion) VALUES (?, ?, ?, ?, ?)',
        [nombre_album, contenido, anio_lanzamiento, artista, duracion],
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ id: results.insertId, ...req.body });
        }
    );
});

// Obtener una canción por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM canciones WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: 'Canción no encontrada' });
        res.json(results[0]);
    });
});

// Actualizar una canción
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_album, contenido, anio_lanzamiento, artista, duracion } = req.body;
    db.query(
        'UPDATE canciones SET nombre_album = ?, contenido = ?, anio_lanzamiento = ?, artista = ?, duracion = ? WHERE id = ?',
        [nombre_album, contenido, anio_lanzamiento, artista, duracion, id],
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.json({ id, ...req.body });
        }
    );
});

// Eliminar una canción
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM canciones WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(204).end();
    });
});

module.exports = router;