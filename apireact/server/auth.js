const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET_KEY = 'patito123';

const users = [];

// Registro
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Validación básica
    if ( !username || !password ) {
        return res.status(400).send('Se require usuario y contraseña.');
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(409).send('Ya existe este usuario.');
    }

    users.push({ username, password });
    res.status(201).send('Usuario registrado.');
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).send('Usuario o contraseña inválidos.');
    }

    const token = jwt.sign( { username }, SECRET_KEY, { expiresIn: '1h'} );
    res.json({ token });
});

// Dashboard
router.get('/dashboard', (req, res) => {
    const authHeader = req.headers.authorization;

    // Verificar que el token exista en el header de autorizaciòn
    if (!authHeader) {
        res.status(401).send('Token no ha sido proporcionado.');
    }

    const token = authHeader.split(' ')[1]; // Extraer el token

    // Verificar el token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(403).send('Token inválido.');
        }

        res.send('Bienvenido al dashboard.');
    });
});

module.exports = router;