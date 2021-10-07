const mongoose = require('mongoose')

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
    msgs: Number,

    //Punishments
    UserID: String,
    Punishments: Array,

    // Verification
    verified: Boolean,

    // Antispam
    User: String,
    userData: Array,

    // Warning System
    userId: String,
    Warnings: Array,
    Mutes: Array
})

module.exports = mongoose.model('GuildConfig', Schema, 'GuildConfig')
