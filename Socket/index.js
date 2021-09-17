const io = require('socket.io')(6969,{
    cors: {
        origin: 'http://localhost:3000',
    },
});

// User array
let users = [];

// Only add user who are not in the users array
const addUser = (userName, socketID) => {
    !users.some(user => user === userName) && 
        users.push({userName, socketID});
}

// Remove a user from users array
const removeUser = (socketID) => {
    users = users.filter((user) => user.socketID != socketID);
}

io.on('connection', (socket) => {
    console.log('A user connected to your channel');

    // Take username from client
    socket.on('addUser', (user) => {
        addUser(user, socket.id);
        io.emit('getUsers', users);
    });

    // Remove user from array when they disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected from your channel');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});