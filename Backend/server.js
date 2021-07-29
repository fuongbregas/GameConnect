const express = require('express');
const app = express();
const connectMongoDB = require("./config/initMongoDB");
const PORT = process.env.PORT || 3001;
const CORS = require('cors');

// routes
const gameDataRoute = require('./routes/gameData');
const authorization = require('./routes/authorization');

// Connect MongoDB
connectMongoDB();

app.use(CORS());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Initialize routes
app.use('/backend/', gameDataRoute);
app.use('/backend/', authorization);

app.listen(PORT, function(){
    console.log('Worked');
});


