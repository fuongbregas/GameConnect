const express = require('express');
const router = express.Router();
const Community = require('../../models/Games/CommunitySchema');

// Check if the user has joined a community
router.get('/:user/:communityID', async (req, res) => {
    const username = req.params.user;
    const communityID = req.params.communityID;
    try {
        const community = await Community.findOne({id: communityID});
        
        if (community.members.includes(username)){
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
    const communityID = req.body.communityID;
    // Add a user to the community member list
    try {
        await Community.findOneAndUpdate({id : communityID}, {$push: {members: username}});
        res.status(200).json("Joined");
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Leave a community
router.put('/unjoin', async (req, res) => {
    const username = req.body.user;    
    const communityID = req.body.communityID;
    // Remove a user to the community member list
    try {
        await Community.findOneAndUpdate({id : communityID}, {$pull: {members: username}});
        res.status(200).json("Unjoined");
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;