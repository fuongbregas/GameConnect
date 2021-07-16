const express = require('express');
const router = express.Router();
const Games = require('../models/Games/GameSchema');


router.get('/community', (req, res) => {
    Games.findOne({name : 'Plants vs. Zombies'}).exec(function(err, gameData){
        if (err) {
            console.log(err, err.stack);
        }
        else{
            res.status(200).send({
                name : gameData,
            });
        }
    });
});

module.exports = router;