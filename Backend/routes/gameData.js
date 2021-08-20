const express = require('express');
const router = express.Router();
const Games = require('../models/Games/GameSchema');
const Genres = require('../models/Games/GenreSchema');
const Community = require('../models/Games/CommunitySchema')

// Get all games from MongoDB, should not use
router.get('/game_data', (req, res) => {
    Games.find({}).exec(function(error, gameData){
        if (error) {
            console.log(error, error.stack);
        }
        else{
            res.status(200).send({
                gameData : gameData,
            });
        }
    });
});

// Get all genres from MongoDB
router.get('/genres', (req, res) => {
    Genres.find({}).exec(function(error, genreData){
        if (error) {
            console.log(error, error.stack);
        }
        else{
            res.status(200).send({
                genreData : genreData,
            });
        }
    });
});

// Find a community based on its name
router.get('/get_one_community', (req, res) =>{
    Community.findOne(
        {
            'name' : req.body.name
        }).exec(function(error, communityData) {
        if (error) {
            console.log(error, error.stack);
        }
        else{
            console.log("Community Data:\n" + communityData);
            res.status(200).send({
                communityData : communityData,
            });
        }
    });
});

module.exports = router;