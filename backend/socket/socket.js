const io = require('socket.io')(5000); // Use the same port as your server

const Message = require('../models/Message');

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', ({ userId }) => {
        socket.join(userId);
        console.log(`${userId} joined`);
    });

    socket.on('sendMessage', async (data) => {
        const { sender, receiver, message } = data;
        await Message.saveMessage(sender, receiver, message);
        io.to(receiver).emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

module.exports = io;
