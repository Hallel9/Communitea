const client = require('../index')
const Discord = require('discord.js')
client.player
    .on('trackStart', (queue, track) => {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Now Playing`)
            .addFields(
                {
                    name: `Title`,
                    value: track.title,
                    inline: true
                },
                {
                    name: 'Artist',
                    value: track.author,
                    inline: true
                },
                {
                    name: `Requested By`,
                    value: `${track.requestedBy.tag}`
                }
            )
            .setColor('GREEN')
        queue.metadata.channel.send({embeds: [embed]})
    })

    .on('error', (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`)
    })

    .on('trackAdd', (queue, track) => {
        queue.metadata.channel.send(`🎶 | Track **${track.title}** queued!`)
    })
    .on('botDisconnect', (queue) => {
        console.log(`🎶 | I'm disconnected from the voice channel.`)
    })
    .on('channelEmpty', (queue) => {
        queue.metadata.channel.send(`❌ | Nobody is in the voice channel, leaving...`)
    })
    .on('queueEnd', (queue) => {
        queue.metadata.channel.send(`🎶 | Queue ended.`)
    })
    .on('trackEnd', (queue, track) => {
        queue.metadata.channel.send(`🎶 | Track **${track.title}** ended.`)
    })
    .on('tracksAdd', (queue, tracks) => {
        queue.metadata.channel.send(`🎶 | Track **${tracks.map((track) => `Tracks ${track.title} - ${track.author} added!`)}** queued!`)
    })
    .on('connectionCreate', (queue, connection) => {
        queue.metadata.channel.send(`🎶 | Connected to ${connection.channel.name}`)
    })
    .on('debug', (queue, message) => {
        console.log(`[${queue.guild.name}] ${message}`)
    })
