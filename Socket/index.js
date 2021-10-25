const io = require('socket.io')(6969,{
    cors: {
        origin: 'http://127.0.0.1:3000',
    },
});

// User array contains userName & socketID for each element
let users = [];

// Only add user who are not in the 'users' array
const addUser = (userName, socketID) => {
    !users.some(user => user === userName) && 
    users.push({userName, socketID});
}

// get user from the 'user' array
const getUser = (userName) => {
    const user = users.find((user) => user.userName === userName);
    return user;
}

// Remove a user from 'users' array
const removeUser = (socketID) => {
    users = users.filter((user) => user.socketID !== socketID);
}

io.on('connection', (socket) => {
    console.log('A user connected to your channel');

    // Take username and ID from client
    socket.on('addUser', (user) => {
        addUser(user, socket.id);
        io.emit('getUsers', users);
    });

    // Send & get a message
    socket.on('sendMessage', ({sender, receiver, message_content}) => {
        const user = getUser(receiver); // Receiver username & socketID
        io.to(user.socketID).emit('getMessage', {
            sender, message_content,
        });
    });

    // User disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected from your channel');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});