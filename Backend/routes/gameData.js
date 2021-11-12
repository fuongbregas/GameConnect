const express = require('express');
const router = express.Router();
const Games = require('../models/Games/GameSchema');
const Genres = require('../models/Games/GenreSchema');
const Community = require('../models/Games/CommunitySchema');
const User = require('../models/Users/UserSchema');

// Get all games from MongoDB, should not use
router.get('/game_data', async (req, res) => {
    try {
        const gameData = await Games.find({});
        res.status(200).send({
            gameData : gameData,
        });
    }
    catch (error) {
        console.log(error, error.stack);
    }
});

// Get a game data from its ID
router.get('/get_one_game/:gameID', async (req, res) => {
    const gameID = req.params.gameID;
    try {
        const game = await Games.findOne({
            'name' : gameID,
        });

        res.status(200).json(game);
    }
    catch (error) {
        console.log(error, error.stack);
    }
});

// Get a game image from its game ID
router.get('/get_one_game_image/:gameID', async (req, res) => {
    const gameID = req.params.gameID;
    try{
        const game = await Games.findOne({
            'id': gameID,
        });

        res.status(200).json(game.cover);
    }
    catch (error) {
        console.log(error, error.stack);
    }
});

// Get all genres from MongoDB
router.get('/genres', async (req, res) => {
    try {
        const genreData = await Genres.find({});
        res.status(200).send({
            genreData : genreData,
        });
    }
    catch (error) {
        console.log(error, error.stack);
    }
});

// Get a community from its name
router.get('/get_one_community', async (req, res) => {
    try {
        const community = await Community.findOne({
            'name' : req.body.name
        });

        res.status(200).send({
            communityData : community,
        });
    }
    catch (error){
        console.log(error, error.stack);
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

// Get searched game data from its name
router.get('/get_searched_game/:game', async (req, res) => {
    try {
        const gameName = req.params.game;
        const game = await Games.findOne({
            gameName : req.body.name,
        });

        res.status(200).json(game);
    }
    catch (error) {
        console.log(error, error.stack);
        res.status(500).json(error);
    }
});

// Return array of games when searching with keywords
router.get('/autosearch/:gameName/:pageNumber', async (req, res) => {
    try {
        let q = req.params.gameName;
        const pageNumber = req.params.pageNumber;
        let query = {
            "$or": [{"name": {"$regex": q, "$options": "i"}}]
        };
        const games = await Games.find(query, {'name' : 1, 'id': 1},)
                                .skip((pageNumber - 1) * 30)
                                .limit(15);
        console.log(games);
        res.status(200).json(games);
    }
    catch (error) {
        res.status(404).json(error);
    }
});

// Return array of games with ratings to display in Discover Games
router.get('/get_rated_game', async (req, res) => {
    try{
        const games = await Games.find({'rating': {"$ne": null}}, {'name': 1, 'id': 1, 'cover': 1, 'rating': 1})
        console.log(games);
        res.status(200).json(games);

    }catch(error){
        res.status(404).json(error);
    }
})

module.exports = router;