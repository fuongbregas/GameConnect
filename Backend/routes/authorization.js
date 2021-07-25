const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// User Schema
const User = require('../models/Users/UserSchema');

// Register User


// Login User
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne ({email: req.body.email});
        !user && res.status(404).json("User not found");
        
        cons
    }

    catch (err) {

    }
});
