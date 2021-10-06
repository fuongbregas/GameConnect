const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    // The ID of the conversation that the message belongs to
    conversation_id: {
        type: String,
        required: true,
    },
    sender_username: {
        type: String,
        required: true,
    },
    // If the message is deleted, hide it from the frontend
    // Default settings is false
    is_deleted: {
        type: Boolean,
        required: true,
    },
    message_content: {
        type: String,
        required: true,
    },
}, {timestamps: true}, 
);

module.exports = Messages = mongoose.model('messageData', MessageSchema, 'messageData');