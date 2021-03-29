const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    category: {
        type: Number,
        required: true,
    },
    first_release_date: {
        type: Number,
        required: true,
    },
    cover: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    updated_at: {
        type: Number,
        required: true,
    },
    genres: {
        type: Array,
        required: true,
    },
    similar_games: {
        type: Array,
        required: true,
    },
});