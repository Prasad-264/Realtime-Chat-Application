// Node Server which will handle socket io connections

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    },
});
const users = {};

io.on('connection', (socket) => {

    // If any new user joined, let others connected users konw about it!!
    socket.on('new-user-joined', (name) => {
        // console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // If someone sends a message, broadcast it to others
    socket.on('send', (message) => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });

    // if someone leaves the chat, let other users know
    socket.on('disconnect', (message) => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    }); 
});