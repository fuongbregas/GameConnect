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

// Get all messages from a conversation ID
router.get('/:conversation_id', async (req, res) => {
    try {
        const message = await Message.find({
            conversation_id : req.params.conversation_id,
        });
        
        res.status(200).send(message);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;