const express = require('express');
const router = express.Router();
const Comment = require('../../models/Posts & Comments/CommentSchema');

// Create a comment in a post
router.post('/', async (req, res) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Get all comments with a username
router.get('/:user/:pageNumber', async (req, res) => {
    const username = req.params.user;
    const pageNumber = req.params.pageNumber;
    try {        
        const comments = await Comment.find({username: username}).skip((pageNumber - 1) * 15).limit(15);

        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Get all comments with a post ID
router.get('/post/:postID/:pageNumber', async (req, res) => {
    const postID = req.params.postID;
    const pageNumber = req.params.pageNumber;
    try {
        const comments = await Comment.find({post_id: postID}).skip((pageNumber - 1) * 15).limit(15);
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Delete
router.delete('/:commentID', async (req, res) => {
    const commentID = req.params.commentID;
    try {
        await Comment.deleteOne({_id: commentID});
        res.status(200).json("Comment is deleted");
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Like 

// Dislike

module.exports = router;