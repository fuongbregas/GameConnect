const io = require('socket.io')(6969,{
    cors: {
        origin: 'http://127.0.0.1:3000',
        methods: ["GET", "POST"]
    },
});

// User array contains userName & socketID for each element
let users = [];

// Only add user who are not in the 'users' array
const addUser = (userName, socketID) => {
    const user_exist = users.some((each_user) => {
        if( each_user.userName === userName){
            return indexOf(each_user);
        }
        else {
            return -1;
        }
    });
    if (user_exist !== -1) {
        users.splice(user_exist, 1);
    }
    users.push({userName, socketID});
    console.log('Socket', users);
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

    console.log('Total users in Socket', users.length);
});