const express = require('express');
const router = express.Router();
const Post = require('../../models/Posts & Comments/PostSchema');
const Comment = require('../../models/Posts & Comments/CommentSchema');
const Game = require('../../models/Games/GameSchema');
const User = require('../../models/Users/UserSchema');
// Create a post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Get info of a post from postID
router.get('/:postID', async (req, res) => {
    const postID = req.params.postID;
    try {
        const post = await Post.findOne({ _id: postID });
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Get all latest posts of a community
router.get('/post/:communityID/:pageNumber', async (req, res) => {
    const communityID = parseInt(req.params.communityID);
    const pageNumber = req.params.pageNumber;
    try {
        const posts = await Post.find({ community_id: communityID }).sort({ "createdAt": -1 }).skip((pageNumber - 1) * 15).limit(15);
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Get all lastest posts
router.get('/post/:pageNumber', async (req, res) => {
    const pageNumber = req.params.pageNumber;
    try {
        const posts = await Post.find({}).sort({ "createdAt": -1 }).skip((pageNumber - 1) * 15).limit(15);
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Get all posts from game/communities with highest rating
router.get('/game/:pageNumber', async (req, res) => {
    const pageNumber = req.params.pageNumber;
    try {
        // Get an array of gameID/communityID with highest rating
        const communities = await Game.find({}, { '_id': 0, 'id': 1 }).sort({ "rating": -1 }).skip((pageNumber - 1) * 15).
            limit(15);
        // Search post with IDs in the array
        const posts = await Post.find({ community_id: { $in: communities } });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Get posts with highest karmas from different communities
// MERGE TEST COMMENT
router.get('/karma/:pageNumber', async (req, res) => {
    const pageNumber = req.params.pageNumber;
    try {
        // MERGE TEST COMMENT
        const posts = await Post.find({}).sort({"karma": -1}).skip((pageNumber - 1) * 15).limit(15);
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Get all posts of a user
router.get('/:user/:pageNumber', async (req, res) => {
    const username = req.params.user;
    const pageNumber = req.params.pageNumber;
    
    try {
        const posts = await Post.find({ username: username }).skip((pageNumber - 1) * 15).limit(15);
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Delete a post
router.delete('/:postID', async (req, res) => {
    const postID = req.params.postID;
    try {
        await Comment.deleteMany({ post_id: postID });
        await User.updateMany({like_posts: postID}, { $pull: { like_posts: postID } });
        await Post.deleteOne({ _id: postID });
        res.status(200).json("Post is deleted");
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Check if user has liked the post
router.get('/karma/:user/:postID', async (req, res) => {
    const username = req.params.user;
    const postID = req.params.postID;
    try {
        const user = await User.findOne({ username: username });

        if (user.like_posts.includes(postID)) {
            res.status(200).json("Liked");
        }
        // If the logged in user sent a friend request to the viewed user
        else {
            res.status(200).json("Unliked");
        }

    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Like the post
router.put('/karma/like', async (req, res) => {
    const username = req.body.user;
    const postID = req.body.postID;

    try {
        await User.findOneAndUpdate({ username: username }, { $push: { like_posts: postID } });
        await Post.findOneAndUpdate({ _id: postID }, { $inc: { karma: 1 } });
        const post = await Post.findOne({ _id: postID });
        data = {
            like_status: "Liked",
            post: post,
        }
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Unlike the post
router.put('/karma/unlike', async (req, res) => {
    const username = req.body.user;
    const postID = req.body.postID;

    try {
        await User.findOneAndUpdate({ username: username }, { $pull: { like_posts: postID } });
        await Post.findOneAndUpdate({ _id: postID }, { $inc: { karma: -1 } });
        const post = await Post.findOne({ _id: postID });
        data = {
            like_status: "Unliked",
            post: post,
        }
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

/*
    - list of communities by number of members 
    - high karma posts
*/

module.exports = router;