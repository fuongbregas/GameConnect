const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    
    // ID of the user who made the comment
    post_id : {
        type: String,
        required: true,
    },

    user_id: {
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
    
    // The ID of the image if the comment has one
    image_id: {
        type: Number,
    }
}, {timestamps: true});

module.exports = Comments = mongoose.model('commentData', CommentSchema, 'commentData');