const express = require('express');
const router = express.Router();
const Community = require('../../models/Games/CommunitySchema');
const User = require('../../models/Users/UserSchema');

// Get community data from community id
router.get('/:communityID', async (req, res) => {
    const communityID = req.params.communityID;
    try {
        const community = await Community.findOne({id: communityID });
        res.status(200).json(community);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Check if the user has joined a community
router.get('/:user/:communityID', async (req, res) => {
    const username = req.params.user;
    const communityID = parseInt(req.params.communityID);
    try {
        const user = await User.findOne({username: username});
        
        if (user.communities.includes(communityID)){
            res.status(200).json("Joined");
        }

        else{
            res.status(200).json("Unjoined");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Join a community
router.put('/join', async (req, res) => {
    const username = req.body.user;    
    const communityID = parseInt(req.body.communityID);
    // Add the communityID to user's communites list
    try {
        await User.findOneAndUpdate({username : username}, {$push: {communities: communityID}});
        await Community.findOneAndUpdate({_id: communityID}, {$inc: {total_members : 1}});
        const community = await Community.findOne({_id: communityID});
        const data = {
            join_status : "Joined",
            community: community,
        }
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Leave a community
router.put('/unjoin', async (req, res) => {
    const username = req.body.user;    
    const communityID = parseInt(req.body.communityID);
    // Remove a user to the community member list
    try {
        await User.findOneAndUpdate({username : username}, {$pull: {communities: communityID}});
        await Community.findOneAndUpdate({_id: communityID}, {$inc: {total_members : -1}});
        const community = await Community.findOne({_id: communityID});
        const data = {
            join_status : "Unjoined",
            community: community,
        }
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;