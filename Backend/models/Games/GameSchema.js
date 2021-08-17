const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    // ID of the game from IGDB
    id: {
        type: Number,
        required: true
    },
    
    aggregated_rating:{
        type: Number,
        required: true,
    },
    category: {
        type: Number,
        required: true,
    },
    cover:{
        type: String,
        required: true,
    },
    // Need ISO 8601 date here
    first_release_date: {
        type: String,
        required: true,
    },
        
    game_modes: {
        type: Array,
        required: true,
    },
    genres: {
        type: Array,
        required: true,
    },
    keywords: {
        type: Array,
        required: true,
    },    
    multiplayer_modes:{
        type: Array,
        required: true,
    },
    
    name:{
        type: String,
        required: true,
    },
    
    rating: {
        type: Number,
        required: true,
    },

    similar_games: {
        type: Array,
        required: true,
    },
    summary:{
        type: String,
        required: true,
    },
    
}, {collection: 'gameData'}); // Name of the collection

module.exports = Games = mongoose.model('gameData', GameSchema);