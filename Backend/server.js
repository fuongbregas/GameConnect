require('dotenv').config();

const express = require('express');
const app = express();
const connectMongoDB = require("./config/initMongoDB");
const PORT = process.env.SERVER_PORT;
const CORS = require('cors');

// routes
const gameDataRoute = require('./routes/gameData');
const authorizationRoute = require('./routes/authorization');
const messageRoute = require('./routes/Conversations & Messasges/messages');
const conversationRoute = require('./routes/Conversations & Messasges/conversations');

// Connect MongoDB
connectMongoDB();

app.use(CORS());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Initialize routes
app.use('/backend/game', gameDataRoute);
app.use('/backend/auth', authorizationRoute);
app.use('/backend/conversations', conversationRoute);
app.use('/backend/messages', messageRoute);

app.listen(PORT, function(){
    console.log('Worked');
});


