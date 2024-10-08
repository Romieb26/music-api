const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // Cambia esto si tu base de datos está en otro host
    user: 'root', // Cambia esto a tu usuario de MySQL
    password: 'romina264', // Cambia esto a tu contraseña de MySQL
    database: 'media_db' // Nombre de la base de datos creada
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

module.exports = db;