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
});

// Get friend status between two users
router.get('/friends/:user/:username', async (req, res) => {
    const logged_in_user = req.params.user;
    const viewed_user = req.params.username;
    try {
        const user = await User.findOne ({username: viewed_user});
        if (user.friend_list.includes(logged_in_user)){
            res.status(200).json("Friend");
        }
        else if (user.pending_friend_requests.includes(logged_in_user)) {
            res.status(200).json("Pending");
        }
        else {
            res.status(200).json("Nothing");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Add a user to pending list
router.put('/friends/add_pending', async (req, res) => {
    const logged_in_user = req.body.user;    
    const viewed_user = {username : req.body.username};
    
    try {
        const user = await User.findOneAndUpdate(viewed_user, {$push: {pending_friend_requests: logged_in_user}});
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Remove a user from pending list
router.put('/friends/remove_pending', async (req, res) => {
    const logged_in_user = req.body.user;    
    const viewed_user = {username : req.body.username};
    try {
        const user = await User.findOneAndUpdate(viewed_user, {$pull: {pending_friend_requests: logged_in_user}});
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Add a user to friend list

// Remove a user from friend list



module.exports = router;