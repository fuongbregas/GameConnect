const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
    // The ID of the community is also the ID of the game
    id: {
        type: Number,
        required: true,
    },
    // Name of the community is the name of the game
    game_name: {
        type: String,
        required: true,
    },
    // The list of IDs of users who are moderator
    mod_list: {
        type: Array,
        required: true,
    },
    // The lists of post's ID
    post_list: {
        type: Array,
        required: true,
    },
}, {collection: 'communityData'});