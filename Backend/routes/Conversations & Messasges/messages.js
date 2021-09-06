const express = require('express');
const router = express.Router();
const Message = require('../../models/Converstions & Messages/MessageSchema');

router.post('/', async (req, res) => {
    const Message = new Message(req.body);
});

module.exports = router;