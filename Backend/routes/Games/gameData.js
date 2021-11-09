const express = require('express');
const router = express.Router();
const Games = require('../../models/Games/GameSchema');
const Genres = require('../../models/Games/GenreSchema');
const Community = require('../../models/Games/CommunitySchema');
const User = require('../../models/Users/UserSchema');

// Get a game data from its ID
router.get('/get_one_game/:gameID', async (req, res) => {
    const gameID = req.params.gameID;
    
    try {
        const game = await Games.findOne(
            {'id' : gameID},
            {
                'name' : 1,
                'first_release_date' : 1,
                'genres' : 1,
                'rating' : 1,
                'summary' : 1,
            },
        );
        const genres = await Genres.find({"id" : {$in : game.genres}}, {'_id': 0, 'name' : 1});
        const date = new Date(game.first_release_date).toLocaleDateString('en-GB', {month: 'long', day: 'numeric', year: 'numeric'});
        const data = {
            'name' : game.name,
            'first_release_date': date,
            'rating': game.rating,
            'summary': game.summary,
            'genres': genres,
        }
        //console.log('Game', data);    
        res.status(200).json(data);
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
router.get('/autosearch/:gameName', async (req, res) => {
    try {
        let q = req.params.gameName;
        let query = {
            "$or": [{"name": {"$regex": q, "$options": "i"}}]
        };
        const games = await Games.find(query, {'name' : 1, 'id': 1},)
                                .limit(30);
        console.log(games);
        res.status(200).json(games);
    }
    catch (error) {
        res.status(404).json(error);
    }
});

module.exports = router;