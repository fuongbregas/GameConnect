const express = require('express');
const router = express.Router();
const Games = require('../models/Games/GameSchema');
const Genres = require('../models/Games/GenreSchema');
const Community = require('../models/Games/CommunitySchema')

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

// Get a game data from its name
router.get('/get_one_game', async (req, res) => {
    try {
        const game = await Games.findOne({
            'name' : req.body.name,
        });

        res.status(200).send({
            gameData : game,
        });
    }
    catch (error) {
        console.log(error, error.stack);
    }
});

// Get a game image from its game ID
router.get('/get_one_game_image', async (req, res) => {
    try{
        const game = await Games.findOne({
            'id': req.body.id,
        });

        console.log(game);
        res.status(200).send({
            imageURL : game.cover,
        });
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



module.exports = router;