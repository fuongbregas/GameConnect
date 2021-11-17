require('dotenv').config();

const express = require('express');
const app = express();
const connectMongoDB = require("./config/initMongoDB");
const PORT = process.env.SERVER_PORT;
const CORS = require('cors');
const http = require('http')
// routes
const gameDataRoute = require('./routes/Games/gameData');
const communityRoute = require('./routes/Games/community');
const savedGameRoute = require('./routes/Games/savedGames');
const authorizationRoute = require('./routes/authorization');
const userRoute = require('./routes/users');
const messageRoute = require('./routes/Conversations & Messasges/messages');
const conversationRoute = require('./routes/Conversations & Messasges/conversations');
const postRoute = require('./routes/Posts & Comments/posts');
const commentRoute = require('./routes/Posts & Comments/comments');

// Connect MongoDB
connectMongoDB();

app.use(CORS());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Initialize routes
app.use('/backend/game', gameDataRoute);
app.use('/backend/communities', communityRoute);
app.use('/backend/savedGames', savedGameRoute);
app.use('/backend/auth', authorizationRoute);
app.use('/backend/users', userRoute);
app.use('/backend/conversations', conversationRoute);
app.use('/backend/messages', messageRoute);
app.use('/backend/posts', postRoute);
app.use('/backend/comments', commentRoute);
http.createServer(app).listen(PORT)



