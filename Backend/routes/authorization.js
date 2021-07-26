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
            join_date: datetime,

        });

        // save user
        const user = await newUser.save();
        res.status(200).json(user);
    }

    catch {
        res.status(500).json(err);
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne ({email: req.body.email}); // find the user in MongoDB with the given email
        !user && res.status(404).json("User not found");
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong password");

        res.status(200).json(user);
    }

    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
