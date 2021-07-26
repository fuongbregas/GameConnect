const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    
    // ID of the user who made the comment
    user_id: {
        type: Number,
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
    // The date it is posted
    date: {
        type: Date,
        required: true,
    },
    // The ID of the image if the comment has one
    image_id: {
        type: Number,
    }
}, {collection: 'commentData'});

module.exports = Comments = mongoose.model('commentData', CommentSchema);