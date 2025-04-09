const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./auth');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});
