const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    image_id: {
        type: Number,
        required: true,
    },
    // URL to the image 
    image_URL: {
        type: String,
        required: true,
    },
    // Path to the image in local machine
    image_path: {
        type: String,
        required: true,
    },
    
}, {collection: 'imageData'});

module.exports = Images = mongoose.model('imageData', ImageSchema);