const express = require('express');
const router = express.Router();
const Games = require('../../models/Games/GameSchema');
const Genres = require('../../models/Games/GenreSchema');
const User = require('../../models/Users/UserSchema');

// Check if the game is saved or not
router.get('/saved_games/:user/:gameID', async (req, res) => {
    const username = req.params.user;
    const gameID = req.params.gameID;
    try {
        const user = await User.findOne({username: username});
        
        if (user.saved_games.includes(gameID)){
            res.status(200).json("Saved");
        }
        // If the logged in user sent a friend request to the viewed user
        else{
            res.status(200).json("Unsaved");
        }
        
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Save a game to save game list
router.put('/saved_games/save', async (req, res) => {
    const username = req.body.user;    
    const gameID = req.body.gameID;

    try {
        await User.findOneAndUpdate({username : username}, {$push: {saved_games: gameID}});
        res.status(200).json("Saved");
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Unsave a game from save game list
router.put('/saved_games/unsave', async (req, res) => {
    const username = req.body.user;    
    const gameID = req.body.gameID;
    try {
        // Delete friends from each list
        await User.findOneAndUpdate({username : username}, {$pull: {saved_games: gameID}});
        res.status(200).json("Unsaved");
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Get saved game array
router.get('/get_saved_games/:user', async (req, res) => {
    try{
        const username = req.params.user;
        const currentUser = await User.findOne({username: username});
        const savedGames = currentUser.saved_games;

        var game = await Games.find({id: {$in: savedGames}});

        res.status(200).json(game);
    }
    catch(error){
        res.status(500).json(error);
    }
});

// Get saved game array page
router.get('/:user/:pageNumber', async (req, res) => {
    try{
        const username = req.params.user;
        const pageNumber = req.params.pageNumber;
        const currentUser = await User.findOne({username: username});
        const savedGames = currentUser.saved_games;

        var game = await Games.find({id: {$in: savedGames}},
                                    {_id: 0, id: 1, name: 1, cover: 1})
                              .skip((pageNumber - 1) * 15)
                              .limit(15);
        res.status(200).json(game);
    }
    catch(error){
        res.status(500).json(error);
    }
});

module.exports = router;