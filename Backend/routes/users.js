const express = require('express');
const router = express.Router();
const User = require('../models/Users/UserSchema');




// Get a user
router.get('/', async (req, res) => {
    // const user_id = req.query.user_id;
    const username = req.query.username;
    console.log("username " + username);
    try {
        const user = await User.findOne({username: username});
        // Exclude sensitive fields, inclusive fields are in other
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    }

    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;