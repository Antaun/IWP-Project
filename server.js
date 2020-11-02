const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('C:/Users/Antaun Bobby/Desktop/HTML/Project/utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('C:/Users/Antaun Bobby/Desktop/HTML/Project/utils/users')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set Static folder
app.use(express.static(path.join(__dirname, 'Public')));

const botName = 'Admin';

// Run when a Client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);
        
        // Welcome the Current User
        socket.emit('message', formatMessage(botName, 'Welcome to WeTalk!'));

        // Broadcast when a User Connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the Chat!`));

        // Send Users and Room info
        io.to(user.room).emit('roomUsers', { room: user.room, users: getRoomUsers(user.room)});
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Broadcast when a User Disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user)
        {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the Chat!`));

            io.to(user.room).emit('roomUsers', { room: user.room, users: getRoomUsers(user.room)});
        }
        
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));