const express = require('express');
const app = express();
const connectMongoDB = require("./config/initMongoDB");
const PORT = process.env.PORT || 3001;

// Connect MongoDB
connectMongoDB();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Initialize routes
app.use(require('./routes/gameData'));

app.listen(PORT, function(){
    console.log('Worked');
});


