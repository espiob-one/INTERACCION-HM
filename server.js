const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de sesiones
app.use(session({
    secret: 'tu_secreto_aqui', // Cambia este valor por una clave secreta segura
    resave: false,
    saveUninitialized: true
}));

// Crear conexión con la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // tu usuario
    password: 'hades', // tu contraseña
    database: 'registro', // la base de datos que estás utilizando
});

// Conectar al servidor MySQL
connection.connect(function(err) {
    if (err) {
        console.error('Error al conectar: ' + err.stack);
        return;
    }
    console.log('Conectado como id ' + connection.threadId);
});

// Ruta POST para registrar usuario
app.post('/register', (req, res) => {
    const { name, email, password, gender, age, weight, activityLevel, diabetes } = req.body;

    const query = `
        INSERT INTO usuarios (nombre, correo, contraseña, sexo, edad, peso, nivel_actividad, diabetes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, email, password, gender, age, weight, activityLevel, diabetes];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al insertar datos: ', err);
            return res.status(500).json({ message: 'Error al guardar los datos' });
        }

        res.status(200).json({ message: 'Usuario registrado correctamente' });
    });
});

// Ruta POST para inicio de sesión


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE (nombre = ? OR correo = ?) AND contraseña = ?';
    const values = [username, username, password];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length > 0) {
            // Si los datos son correctos, guardamos el id del usuario en la sesión
            req.session.userId = results[0].id;  // Guardamos el id del usuario en la sesión
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
    });
});



// Ruta para obtener el perfil del usuario
app.get('/profile', (req, res) => {
    if (!req.session.userId) {
        // Si no hay sesión activa, enviamos un mensaje de error
        return res.status(401).json({ message: 'No autorizado. Inicia sesión primero.' });
    }

    // Si la sesión existe, obtenemos el perfil del usuario desde la base de datos
    const query = 'SELECT nombre, sexo, edad, peso, nivel_actividad, diabetes FROM usuarios WHERE id = ?';
    const values = [req.session.userId]; // Usamos el id del usuario guardado en la sesión

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error al obtener el perfil:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length > 0) {
            // Enviamos los datos del perfil
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    });
});

// Ruta para la barra de búsqueda
app.get('/search-recipes', (req, res) => {
    const searchQuery = req.query.q || ''; // Captura la consulta de búsqueda
    const sql = `
        SELECT title, description, ingredients, steps 
        FROM recipes 
        WHERE title LIKE ? OR description LIKE ?;
    `;
    const values = [`%${searchQuery}%`, `%${searchQuery}%`];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).json({ error: 'Error al realizar la consulta' });
        } else {
            res.json(results);
        }
    });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
