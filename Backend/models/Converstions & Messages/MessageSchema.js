const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message_id: {
        type: Number,
        required: true,
    },
    // The ID of the conversation that the message belongs to
    conversation_id: {
        type: Number,
        required: true,
    },
    user_id: {
        type: Number,
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
    // The date the message was sent
    date: {
        type: Date,
        required: true,
    }
}, {collection: 'messageData'});

module.exports = Messages = mongoose.model('messageData', MessageSchema);