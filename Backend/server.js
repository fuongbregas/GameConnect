const express = require('express');
const app = express();
const connectMongoDB = require("./config/initMongoDB");
const PORT = process.env.PORT || 3001;

// Connect MongoDB
connectMongoDB();

app.listen(PORT, function(){
    console.log('Listening on 3001');
});


