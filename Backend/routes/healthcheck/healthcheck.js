
const express = require('express');
const router = express.Router();


// Create a comment in a post
router.get('/healthcheck', async (req, res) => {
    try {
        res.status(200).json("okokok");
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;