const express = require('express');
const router = express.Router();
const Conversation = require('../../models/Converstions & Messages/ConversationSchema');
const Message = require('../../models/Converstions & Messages/MessageSchema');
const User = require('../../models/Users/UserSchema');
router.post('/', async (req, res) => {
    const sender = req.body.sender_username;
    const receiver = req.body.receiver_username;
    const users = [sender, receiver];
    const message_content = req.body.message_content;
    try {
        const receiver_existance = await User.findOne({username: receiver});
        if (receiver_existance !== null) {
            const existance = await Conversation.findOne({users: {$all: users}});
            // If the conversation between the two users does not exist
            if (existance === null) {
                // Create a new conversation
                const newConversation = new Conversation({users: users});
                const savedConversation = await newConversation.save();
                
                // Create a new message
                const message = {
                    sender_username: sender,
                    message_content: message_content,
                    is_deleted: false,
                    conversation_id: savedConversation._id,
                };
                const newMessage = new Message(message);
                await newMessage.save();

                // Return a new list of messages
                const messages = await Message.find({
                    conversation_id : savedConversation._id,
                }).sort({"createdAt": -1}).skip((1 - 1) * 15).limit(15).lean();
        
                const deleted_message = 'This message has been deleted.';
                for(var i = 0; i < messages.length; i++) {
                    if(messages[i].is_deleted === true){
                        messages[i].message_content = deleted_message;
                    }
                }
                const reversed_message = messages.reverse();

                // Return a new list of conversations
                const conversations = await Conversation.find({
                    users: { $in: [sender]},
                });
                const data = {
                    savedConversation : savedConversation,
                    messages : reversed_message,
                    conversations: conversations,
                }
                
                res.status(200).json(data);
            }
            else {
                // Create a new message
                const message = {
                    sender_username: sender,
                    message_content: message_content,
                    is_deleted: false,
                    conversation_id: existance._id,
                };
                const newMessage = new Message(message);
                await newMessage.save();

                // Return a new list of messages
                const messages = await Message.find({
                    conversation_id : existance._id,
                }).sort({"createdAt": -1}).skip((1 - 1) * 15).limit(15).lean();
        
                const deleted_message = 'This message has been deleted.';
                for(var i = 0; i < messages.length; i++) {
                    if(messages[i].is_deleted === true){
                        messages[i].message_content = deleted_message;
                    }
                }
                const reversed_message = messages.reverse();

                // Return a new list of conversations
                const conversations = await Conversation.find({
                    users: { $in: [sender]},
                });
                
                // Return data
                const data = {
                    savedConversation : existance,
                    messages : reversed_message,
                    conversations: conversations,
                }
                
                res.status(200).json(data);
            }
        }
        else {
            res.status(404).json('User not found.');
        }
        
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Send message to self
router.post('/self', async (req, res) => {
    const sender = req.body.sender_username;
    const receiver = req.body.receiver_username;
    const users = [sender, receiver];
    const message_content = req.body.message_content;

    try {
        const existance = await Conversation.findOne({users: {$eq: users}});

        // If the conversation between the two users does not exist
        if (existance === null) {
            // Create a new conversation
            const newConversation = new Conversation({users: users});
            const savedConversation = await newConversation.save();
            
            // Create a new message
            const message = {
                sender_username: sender,
                message_content: message_content,
                is_deleted: false,
                conversation_id: savedConversation._id,
            };
            const newMessage = new Message(message);
            await newMessage.save();

            // Return a new list of messages
            const messages = await Message.find({
                conversation_id : savedConversation._id,
            }).sort({"createdAt": -1}).skip((1 - 1) * 15).limit(15).lean();
    
            const deleted_message = 'This message has been deleted.';
            for(var i = 0; i < messages.length; i++) {
                if(messages[i].is_deleted === true){
                    messages[i].message_content = deleted_message;
                }
            }
            const reversed_message = messages.reverse();

            // Return a new list of conversations
            const conversations = await Conversation.find({
                users: { $in: [sender]},
            });
            const data = {
                savedConversation : savedConversation,
                messages : reversed_message,
                conversations: conversations,
            }
            
            res.status(200).json(data);
        }
        else {
            // Create a new message
            const message = {
                sender_username: sender,
                message_content: message_content,
                is_deleted: false,
                conversation_id: existance._id,
            };
            const newMessage = new Message(message);
            await newMessage.save();

            // Return a new list of messages
            const messages = await Message.find({
                conversation_id : existance._id,
            }).sort({"createdAt": -1}).skip((1 - 1) * 15).limit(15).lean();
    
            const deleted_message = 'This message has been deleted.';
            for(var i = 0; i < messages.length; i++) {
                if(messages[i].is_deleted === true){
                    messages[i].message_content = deleted_message;
                }
            }
            const reversed_message = messages.reverse();

            // Return a new list of conversations
            const conversations = await Conversation.find({
                users: { $in: [sender]},
            });
            
            // Return data
            const data = {
                savedConversation : existance,
                messages : reversed_message,
                conversations: conversations,
            }
            
            res.status(200).json(data);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Get conversations from a user
router.get('/:username', async (req, res) => {
    try {
        const conversation = await Conversation.find({
            users: { $in: [req.params.username]},
        });
        res.status(200).json(conversation);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Get a conversation between two users
router.get('/get_one_conversation/:sender/:receiver', async (req, res,) => {
    try {
        const array_of_users = [req.params.sender, req.params.receiver];
        const conversation = await Conversation.findOne({
            users : {$all: array_of_users},
        });
        
        res.status(200).json(conversation);
    }
    catch (error) {
        res.status(500).json(error);
        
    }
});

module.exports = router;