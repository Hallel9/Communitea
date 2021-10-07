const client = require('../index')
const {MessageEmbed} = require('discord.js')
const db = require('../models/guild-schema')
const moment = require('moment')
async function msgs(message, newmessage) {
    const channels = ['893112833091469422', '894414457051168809']
    if (channels.includes(message.channel.id)) return
    if (client.owners.includes(message.author.id)) return
    if (newmessage) {
        if (message.content == newmessage.content) return
        message = newmessage
    }
    if (message.author.bot || !message.guild) return
    let am = client.automod.get(message.author.id) ?? []
    if (am.length >= 5) {
        console.log('here mute for spam')
    }
    am.push(moment().format('mm:ss'))
    client.automod.set(message.author.id, am)
    setTimeout(() => {
        am = []
        console.log(am)
    }, 4000)
    console.log('map:\n', am)
}
client.on('messageCreate', msgs)
client.on('messageUpdate', msgs)
