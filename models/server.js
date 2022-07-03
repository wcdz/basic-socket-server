const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/sockets.controller');
require('dotenv').config();

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server); // Informacion de todos los sockets conectados

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {
        // this.app.use(this.paths.auth, require('../routes/auth'));
    }

    // Socket.io maneja la conexion con un solo stream por cliente
    // socket.id id interno de socket.io no usar pq es volatil
    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;

// Verficiacion de utilizacion de socket -> http://localhost:8080/socket.io/socket.io.js