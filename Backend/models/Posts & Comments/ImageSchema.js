const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    
    // URL to the image 
    image_URL: {
        type: String,
        required: true,
    },
        
}, {collection: 'imageData'});

module.exports = Images = mongoose.model('imageData', ImageSchema);