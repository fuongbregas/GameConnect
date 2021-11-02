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
        const user1 = await User.findOne({username: viewed_user});
        const user2 = await User.findOne({username: logged_in_user});
        if (user1.friend_list.includes(logged_in_user)){
            res.status(200).json("Friend");
        }
        // If the logged in user sent a friend request to the viewed user
        else if (user1.pending_friend_requests.includes(logged_in_user)) {
            res.status(200).json("Pending");
        }
        // If the logged in user had a pending request from the viewed user
        else if (user2.pending_friend_requests.includes(viewed_user)) {
            res.status(200).json("Acceptable");
        }
        else {
            res.status(200).json("Nothing");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Add the logged in user to pending list of the viewed user
router.put('/friends/add_pending', async (req, res) => {
    const logged_in_user = req.body.user;    
    const viewed_user = req.body.username;
    try {
        // Add a user to each pending list
        await User.findOneAndUpdate({username : viewed_user}, {$push: {pending_friend_requests: logged_in_user}});
        
        res.status(200).json("Pending");
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Remove a user from pending list
router.put('/friends/remove_pending', async (req, res) => {
    const logged_in_user = req.body.user;    
    const viewed_user = req.body.username;
    try {
        // Remove both users from each pending list
        await User.findOneAndUpdate({username : viewed_user}, {$pull: {pending_friend_requests: logged_in_user}});
        await User.findOneAndUpdate({username : logged_in_user}, {$pull: {pending_friend_requests: viewed_user}});
        res.status(200).json("Nothing");
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Add a user to friend list
router.put('/friends/acceptable', async (req, res) => {
    const logged_in_user = req.body.user;    
    const viewed_user = req.body.username;

    try {
        // Remove both users from both pending lists
        await User.findOneAndUpdate({username : viewed_user}, {$pull: {pending_friend_requests: logged_in_user}});
        await User.findOneAndUpdate({username : logged_in_user}, {$pull: {pending_friend_requests: viewed_user}});
        
        // Add both users to both friend lists
        await User.findOneAndUpdate({username : viewed_user}, {$push: {friend_list: logged_in_user}});
        await User.findOneAndUpdate({username : logged_in_user}, {$push: {friend_list: viewed_user}});
        
        res.status(200).json("Friend");
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Remove a user from friend list
router.put('/friends/unfriend', async (req, res) => {
    const logged_in_user = req.body.user;    
    const viewed_user = req.body.username;
    try {
        // Delete friends from each list
        await User.findOneAndUpdate({username : viewed_user}, {$pull: {friend_list: logged_in_user}});
        await User.findOneAndUpdate({username : logged_in_user}, {$pull: {friend_list: viewed_user}});
        res.status(200).json("Nothing");
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Friend pagination
router.post('/friends/friends_page', async (req, res) => {
    const username =  req.body.username;
    const pagination = req.body.pagination ? parseInt(req.body.pagination) : 10;
    //PageNumber From which Page to Start 
    const pageNumber = req.body.page ? parseInt(req.body.page) : 1;

    try {
        const user = await User.findOne({username: username});
        const friends = await Promise.all(
            user.friend_list.map ((friend_username) => {
                return User.findOne({username: friend_username});
            })).skip((pageNumber - 1) * pagination)
                //limit is number of Records we want to display
                .limit(pagination);
        res.status(200).json(friends);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Count friends
router.get('/total_friends/:username', async (req, res) => {
    
        
    try {
        const username = req.params.username;
        const user = await User.findOne({username: username}).lean();
        
        res.status(200).json(user.friend_list.length);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;