const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    aggregate_rating:{
        type: Mixed,
        required: true,
    },
    category: {
        type: Number,
        required: true,
    },
    cover:{
        type: Number,
        required: true,
    },
    first_release_date: {
        type: Number,
        required: true,
    },
    // Need ISO 8601 date here
    
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
        type: Mixed,
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
});

module.exports = GameSchema = mongoose("game_schema", GameSchema);