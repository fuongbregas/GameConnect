const express = require('express');
const router = express.Router();
const Game = require('../models/Games/GameSchema');

router.get('/community', (req, res) =>{
    Game.find({'name' : 'Plants vs. Zombies'}).exec(function(err, gameData){
        if (err){
            console.log (err, err.stack);
        }
        else {            
            res.status(200).send({
                gameData : gameData,
            });
        }
    });
});

module.exports = router;