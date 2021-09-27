const express = require('express');
const router = express.Router();
const Conversation = require('../../models/Converstions & Messages/ConversationSchema');

router.post('/', async (req, res) => {
    console.log('Sender: ' + req.body.sender_username);
    const newConversation = new Conversation({
        users: [req.body.sender_username, req.body.receiver_username]
    });
    
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
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
        //console.log('Sender: ' + req.params.sender);
        //console.log('Receiver: ' + req.params.receiver);
        const conversation = await Conversation.findOne({
            users : {
                $all: [req.params.sender, req.params.receiver]
            },
        });
        
        res.status(200).json(conversation);
    }
    catch (error) {
        res.status(404).send('No coversation with this user');
    }
});

module.exports = router;