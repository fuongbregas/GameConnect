const mongoose = require("mongoose");

/*
init mongodb: default is dev 
init mongod: test npm start test
*/

const mongoURI_test = process.env.TEST_MONGO;
const mongoURI = process.env.LOCAL_MONGO;


const options = {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

const initDB = async () => {
    try{ 
        console.log(process.env.NODE_ENV)
        if(process.env.NODE_ENV==='dev'){
        await mongoose.connect(mongoURI, options);
        console.log("Successfully connected to production MongoDB");
        console.log('Listening on 3001');
        }
        else{
            await mongoose.connect(mongoURI_test, options);
        console.log("Successfully connected to test MongoDB");
        console.log('Listening on 3001');
        }
    }
    catch(error){
        console.log("Failed to connect to MongoDB");
        console.log(error);
        process.exit(1);
    }
};

module.exports = initDB;