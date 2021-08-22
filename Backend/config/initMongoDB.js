const mongoose = require("mongoose");
const mongoURI = process.env.LOCAL_MONGO;

const options = {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

const initDB = async () => {
    try{
        await mongoose.connect(mongoURI, options);
        console.log("Successfully connected to MongoDB");
        console.log('Listening on 3001');
    }
    catch(err){
        console.log("Failed to connect to MongoDB");
        console.log(err);
        process.exit(1);
    }
};

module.exports = initDB;