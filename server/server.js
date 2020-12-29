const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

var app = express();

var port = process.env.PORT || 3000;
const pathToPublic = path.join(__dirname + '/../public');

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(pathToPublic));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('createMessage', (message, callback) => {
        // console.log(message);

        io.emit('newMessage', generateMessage( message.from, message.text));

        callback();

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime() 
        // });
    });

    socket.on('getCurrentLocation', (location) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', location.latitude, location.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User disconected');
    });
});


server.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});