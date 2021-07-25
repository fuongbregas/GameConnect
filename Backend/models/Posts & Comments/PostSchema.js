const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    post_id: {
        type: Number,
        required: true,
    },
    // The ID of the game/community the post belongs to
    game_id: {
        type: Number,
        required: true,
    },
    comment_id: {
        type: Array,
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
    // List of images added to the post
    image_list: {
        type: Array,
    },
    // ID of the user who created the post
    user_id: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
}, {collection: 'postData'});

module.exports = Posts = mongoose.model('postData', PostSchema);
