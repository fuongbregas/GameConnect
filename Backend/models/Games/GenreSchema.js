const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    // From IGDB data
    genre_id: {
        type: Number,
        required: true,
    },
    // Name of the genreData
    genre_name: {
        type: String,
        required: true,
    },
}, {collection: 'genreData'}); // Name of the collection

module.exports = Genres = mongoose.model('genreData', GenreSchema);