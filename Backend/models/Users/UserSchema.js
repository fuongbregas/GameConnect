const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profile_picture: {
        type: String,
    },
    friend_list: {
        type: Array,
        required: true,
    },
    recommended_friends:{
        type: Array,
        required: true,
    },
    blocked_list: {
        type: Array,
        required: true,
    },
    pending_friend_requests: {
        type: Array,
        required: true,
    },
    like_posts : {
        type: Array,
        required: true,
    },
    communities: {
        type: Array,
        required: true,
    },
    communities_mod: {
        type: Array,
        required: true,
    },
    conversations: {
        type: Array,
        required: true,
    },
    saved_games:{
        type: Array,
        required: true,
    },
    is_creator: {
        type: Boolean,
        required: true,
    },
    is_banned: {
        type: Boolean,
        required: true,
    }

}, {timestamps: true},); // Name of the collection

module.exports = Users = mongoose.model('userData', UserSchema, 'userData');
