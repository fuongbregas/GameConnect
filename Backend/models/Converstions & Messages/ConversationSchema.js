const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    conversation_id: {
        type: Number,
        required: true,
    },
    // The title of the conversation,
    // default name can be set to the username of the user who initially receives the message
    title: {
        type: String,
        required: true,
    },
    // List of messages of this conversation
    message_list:{
        type: Array,
        required: true,
    },
    // Date the conversation was created
    date: {
        type: Date,
        required: true,
    }
}, {collection: 'conversationData'});

module.exports = Conversations = mongoose.model('conversationData', ConversationSchema);