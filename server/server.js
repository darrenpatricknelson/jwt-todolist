require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const auth = require('./routes/auth.routes.js');
const bodyParser = require('body-parser');


// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// the following middleware outputs information about the request in the terminal
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// initial welcome
app.get('/', (req, res) => {
    res.json({
        message: 'Hello'
    });
});

// test (can be removed)
app.post('/test', (req, res) => {
    const user = req.body.username;
    const pwd = req.body.password;

    payload = {
        'name': user,
        'password': pwd
    };

    const token = jwt.sign(JSON.stringify(payload), process.env.SECRET_KEY, { algorithm: 'HS256' });

    res.send({ 'token': token });
});

// routes
app.use('/auth', auth);

// connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // listening on port
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Connected to DB and listening on port ${PORT}!`);
        });
    })
    .catch(error => {
        console.log(error);
    });