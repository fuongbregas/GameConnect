const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    // MongoDB _id of the post
    post_id : {
        type: String,
        required: true,
    },
    community_id : {
        type: Number,
        required: true,
    },
    post_title : {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    karma: {
        type: Number,
        required: true,
    },
    comment_content: {
        type: String,
        required: true,
    },
    
}, {timestamps: true});

module.exports = Comments = mongoose.model('commentData', CommentSchema, 'commentData');