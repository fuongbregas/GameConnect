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
        res.status(404).json(error);
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
        const games = await Games.find(query, {'name' : 1, 'id': 1, 'cover': 1, 'rating': 1, 'first_release_date': 1})
                                .skip((pageNumber - 1) * 15)
                                .limit(15);
        console.log(games);
        res.status(200).json(games);
    }
    catch (error) {
        res.status(404).json(error);
    }
});

// Return array of games with ratings to display in Discover Games
router.get('/get_rated_game/:pageNumber', async (req, res) => {
    const pageNumber = req.params.pageNumber;
    try{
        const games = await Games.find({'rating': {"$ne": null}}, {'name': 1, 'id': 1, 'cover': 1, 'rating': 1, 'first_release_date': 1})
                                .sort({'rating': -1})
                                .skip((pageNumber - 1) * 15)
                                .limit(15);
        console.log(games);
        res.status(200).json(games);

    }catch(error){
        res.status(404).json(error);
    }
});

// Get all genres from MongoDB
router.get('/genres', async (req, res) => {
    try {
        const genreData = await Genres.find({});
        res.status(200).json(genreData);
    }
    catch (error) {
        res.status(404).json(error);
    }
});

// Get all games of a particular genre
router.get('/genres/:genreId/:pageNumber', async (req, res) => {
    try{
        const genreId = parseInt(req.params.genreId);
        const pageNumber = req.params.pageNumber;
        const genreGames = await Games.find({'genres': genreId}, {'name': 1, 'id': 1, 'cover': 1, 'rating': 1, 'first_release_date': 1})
                                    .skip((pageNumber - 1) * 15)
                                    .limit(15);
        res.status(200).json(genreGames);
    }catch(error){
        res.status(404).json(error);
    }
});

// Get all games and sort by release date
router.get('/get_new_games/:pageNumber', async (req, res) => {
    try{
        const pageNumber = req.params.pageNumber;
        const todayDate = new Date().toISOString();
        const newReleases = await Games.find({'first_release_date': {'$lte': todayDate}}, {'name': 1, 'id': 1, 'cover': 1, 'first_release_date': 1, 'rating': 1, '_id': 0})
                                        .sort({'first_release_date': -1})
                                        .skip((pageNumber - 1) * 15)
                                        .limit(15);
        res.status(200).json(newReleases);
    }catch(error){
        res.status(404).json(error);
    }
});

// Get similar games of a certain saved game
router.get('/get_recommended_game/:user/:pageNumber', async (req, res) => {
    try{
        const user = req.params.user;
        const currentUser = await User.findOne({username: user});
        const savedGames = currentUser.saved_games;
        var randomSavedGameId = savedGames[Math.floor(Math.random() * savedGames.length)];
        const randomSavedGame = await Games.findOne({'id': randomSavedGameId});
        const similarGames = randomSavedGame.similar_games;

        const recommendedGames = await Games.find({'id': {$in: similarGames}}, {'id': 1, '_id': 0, 'name': 1, 'cover': 1, 'rating': 1, 'first_release_date': 1});
        res.status(200).json(recommendedGames);
    }catch(error){
        res.status(404).json(error);
    }
});

// Get top 5 games with highest ratings
router.get('/top', async (req, res) => {
    try {
        // Get an array of gameID/communityID with highest rating
        const games = await Games.find({}, { '_id': 0, 'id': 1, 'name': 1, 'summary': 1, 'cover': 1 }).sort({ "rating": -1 }).limit(5);
        res.status(200).json(games);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
