import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

// Middleware per gestire le intestazioni CORS per tutte le richieste HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://tackchat.it");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
});

// Creazione del server HTTP
const server = http.createServer(app);

// Configurazione di Socket.IO con CORS
const io = new Server(server, {
    cors: {
        origin: ["https://tackchat.onrender.com", "https://www.tackchat.it", "http://localhost:3000"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on('connection', (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen on to the events. Can be used both on client and server side
    socket.on('disconnect', () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export {app, io, server};