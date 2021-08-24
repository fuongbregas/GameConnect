const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(   
{
    // Users who participate in this conversation.
    users: {
        type: Array,
    }
    
}, {timestamps: true},);

module.exports = Conversations = mongoose.model('conversationData', ConversationSchema, 'conversationData');