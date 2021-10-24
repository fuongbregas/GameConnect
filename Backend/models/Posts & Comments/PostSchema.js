const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    
    // The ID of the game/community the post belongs to
    game_id: {
        type: Number,
        required: true,
    },
    
    karma: {
        type: Number,
        required: true,
    },
    // True if Solved, and False if Unsolved
    status: {
        type: Boolean,
        required: true,
    },
    // The type of the post which can be “Question,” “Discussion,” “News,”
    post_type: {
        type: String,
        required: true,
    },
    // The title of the post
    title: {
        type: String,
        required: true,
    },
    // The content of the post
    post_content: {
        type: String,
        required: true,
    },
    // URL of image
    image_list: {
        type: String,
    },
    // ID of the user who created the post
    user_id: {
        type: String,
        required: true,
    },
    
}, {timestamps: true});

module.exports = Posts = mongoose.model('postData', PostSchema, 'postData');
