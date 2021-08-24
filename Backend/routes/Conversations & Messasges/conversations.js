const express = require('express');
const router = express.Router();
const Conversation = require('../../models/Converstions & Messages/ConversationSchema');

router.post('/', async (req, res) => {
    
    const newConversation = new Conversation({
        users: [req.body.senderID, req.body.receiverID],
    });
    
    try {
        const savedConversation = await newConversation;
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get conversation from a user

module.exports = router;