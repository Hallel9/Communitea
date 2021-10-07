const Mod = require('../models/guild-schema')
async function Punish(guild, moderator, punishment, user, reason) {
    let data = await Mod.findOne({Guild: guild.id, UserID: user.id})
    if (!data) {
        await Mod.create({
            Guild: guild.id,
            UserID: user.id,
            Punishments: []
        })

        data = await Mod.findOne({Guild: guild.id, UserID: user.id})
    }
    if (punishment === 'kick') {
        await data.Punishments.push({
            Moderator: moderator.id,
            PunishType: 'Kick',
            User: user.id,
            Reason: reason,
            Date: require('moment')().format('DD-MM-YYYY')
        })
        await data.save()
    }
    if (punishment === 'ban') {
        await db.Punishments.push({
            Moderator: moderator.id,
            PunishType: 'Ban',
            User: user.id,
            Reason: reason,
            Date: require('moment')().format('DD-MM-YYYY')
        })
    }
}

module.exports = {Punish}
