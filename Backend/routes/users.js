const express = require('express');
const router = express.Router();
const User = require('../models/Users/UserSchema');

// Return array of users when searching with keywords
router.get('/autosearch', async (req, res) => {
    try {
        let q = req.query.key;
        console.log('Params: ' + q);
        let query = {
            "$or": [{"username": {"$regex": q, "$options": "i"}}]
        };
        const users = await User.find(query, {'username' : 1},)
                                .sort({date: -1})
                                .limit(10);
        
        res.status(200).json(users);
    }
    catch (error) {
        res.status(404).json(error);
    }
});

// Get friends
router.get('/friends/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({username: username});
        const friends = await Promise.all(
            user.friend_list.map ((friend_username) => {
                return User.findOne({username: friend_username});
            })
        );

        var friend_list = [];
        friends.map ((each_friend) => {
            const {_id, username, profile_picture} = each_friend;
            friend_list.push({_id, username, profile_picture});
        });

        res.status(200).json(friend_list);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Get a user
router.get('/', async (req, res) => {
    // const user_id = req.query.user_id;
    const username = req.query.username;
    try {
        const user = await User.findOne({username: username});
        // Exclude sensitive fields, inclusive fields are in other
        const {password, updatedAt, ...other} = user._doc;
        if (user == null) {
            res.status(404).json('The user does not exist');
        }
        res.status(200).json(other);
    }

    catch (error) {
        res.status(500).json(error);
    }
});

// Update profile picture 
router.put('/new_profile_picture', async (req, res) => {
    const username = {username : req.body.username};
    const newPicture = {profile_picture : req.body.profile_picture};
    try {
        const user = await User.findOneAndUpdate(username, newPicture);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;