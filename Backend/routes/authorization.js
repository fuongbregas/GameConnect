const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// User Schema
const User = require('../models/Users/UserSchema');

// Register User
router.post('/register', async (req, res) => {
    try {
        // generate hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        var datetime = new Date(Date.now()).toISOString();
        
        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            profile_picture: "",
            join_date: datetime,
            friend_list: [],
            blocked_list: [],
            pending_friend_requests: [],
            post_history: [],
            comment_history: [],
            communities: [],
            conversations: [],
            saved_games: [],
            is_creator: false,
            is_banned: false,            
        });

        // save user
        const user = await newUser.save();
        console.log(user);
        res.status(200).json(user);
    }

    catch (err) {
        res.status(500).json(err);
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne ({email: req.body.email}); // find the user in MongoDB with the given email
        console.log("Login request: " + JSON.stringify(req.body));
        !user && res.status(404).json("user not found"); // no email found
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong password"); // no email found

        console.log("Login user: " + user);
        res.status(200).json(user);
        
    }

    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
