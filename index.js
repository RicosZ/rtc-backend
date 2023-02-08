const express = require('express');
const app = express();
// const { Server } = require('socket.io');
// const mongoose = require('mongoose');
// const { MONGO_DB_CONFIG } = require('./config/app.config');

// const {initMeetingServer} = require('./meeting-server');

// initMeetingServer(server);

async function server() {
    const http = require('http').createServer(app);
    const io = require('socket.io')(http,{ transports: ['websocket'] });
    const roomName = 'room1';
    io.on('connection', (socket)=>{
        socket.on('join',()=>{
            socket.join(roomName);
            socket.to(roomName).emit('joined');
            // socket.emit('joined');
            console.log(io.sockets.adapter.rooms[roomName].length);
            console.log('join');
        });
        
        socket.on('offer',(offer)=>{
            // console.log(offer);
            socket.to(roomName).emit('offer',offer);
            // socket.emit('offer',offer);
            console.log('offer');
        });
        socket.on('answer',(answer)=>{
            socket.to(roomName).emit('answer',answer);
            // socket.emit('answer',answer);
            console.log('answer');
        });
        socket.on('candidiate',(candidiate)=>{
            socket.to(roomName).emit('candidiate',candidiate);
            // socket.emit('ice',ice);
            console.log('candidiate');
        });
    });
    const port = process.env.port || 4444;
    http.listen(port, function () {
        console.log(`API Ready!!! on ${port}`);
    });
}

server();

// mongoose.Promise = global.Promise;
// mongoose.connect(MONGO_DB_CONFIG.DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('Database Connected');
// }, (error) => {
//     console.log(error.message);
// });

// app.use(express.json());
// app.use('/api/v1', require('./routes/app.routes'));

// http.listen(process.env.port || 4444, function () {
//     console.log('API Ready!!!');
// });