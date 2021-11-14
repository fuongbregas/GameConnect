const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    
    // ID of the user who made the comment
    post_id : {
        type: String,
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