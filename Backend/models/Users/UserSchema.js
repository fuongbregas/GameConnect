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
    join_date: {
        type: String,
        required: true,
    },
    friend_list: {
        type: Array,
        required: true,
    },
    post_history: {
        type: Array,
        required: true,
    },
    comment_history: {
        type: Array,
        required: true,
    },
    communities: {
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
    },
    login_token: {
        type: String,
    },
    

}, {collection: 'userData'}); // Name of the collection

module.exports = Users = mongoose.model('userData', UserSchema);