const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/gameConnect"

const options = {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

const initDB = async () => {
    try{
        await mongoose.connect(mongoURI, options);
        console.log("Successfully connected to MongoDB");
    }
    catch(err){
        console.log("Failed to connect to MongoDB");
        console.log(err);
        process.exit(1);
    }
};

module.exports = initDB;