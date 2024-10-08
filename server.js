const express = require('express');
const cors = require('cors'); // Importa el módulo cors
const db = require('./db');
const cancionesRoutes = require('./routes/canciones');

const app = express();

// Configuración de CORS para permitir todas las solicitudes
app.use(cors()); // Esto permitirá CORS para todos los orígenes

app.use(express.json());
app.use('/api/canciones', cancionesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});