const express = require('express');
const router = express.Router();
const Message = require('../../models/Converstions & Messages/MessageSchema');

// Create a new message
router.post('/', async (req, res) => {
    const newMessage = new Message(req.body);

    try {
        const saveMessage = await newMessage.save();
        res.status(200).json(saveMessage);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Replace message_content of deleted message


// Get all messages from a conversation ID
router.get('/:conversation_id', async (req, res) => {
    try {
        const message = await Message.find({
            conversation_id : req.params.conversation_id,
        }).lean();
        const deleted_message = 'This message has been deleted.';
        for(var i = 0; i < message.length; i++) {
            if(message[i].is_deleted === true){
                message[i].message_content = deleted_message;
            }
        }
        
        
        res.status(200).send(message);
        
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Get few number of messages from a conversation ID
router.get('/pagination_message/:conversation_id/:offset', async (req, res) => {
    try {
        var conversation_id = req.params.conversation_id;
        var offset = req.params.offset;
        const message = await Message.find({
            conversation_id : conversation_id,
        }).skip(offset).limit(10).lean();

        const deleted_message = 'This message has been deleted.';
        for(var i = 0; i < message.length; i++) {
            if(message[i].is_deleted === true){
                message[i].message_content = deleted_message;
            }
        }
        
        
        res.status(200).send(message);
    }
    catch (error) {
        
    }
});

module.exports = router;