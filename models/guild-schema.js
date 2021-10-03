const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    //Blacklist words
    Guild: String,
    Words: {
        type: Array,
        default: [],
        required: false
    },
    // Automod
    enabled: Boolean,
    user: String,
    msgs: Number
})

module.exports = mongoose.model('GuildConfig', Schema, 'GuildConfig')