const {Message, MessageEmbed} = require('discord.js')
const Client = require('../../index')
const wait = require('util').promisify(setTimeout)

const {CommandInteraction} = require('discord.js')
const {player} = require('../../index')

module.exports = {
    name: 'skip',
    description: 'Skip a song',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, Discord, send, embed) => {
        if (!interaction.member.voice.channel)
            return await interaction.reply({
                content: 'You must be in a voice channel',
                ephemeral: true
            })
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId)
            return await interaction.reply({
                content: 'I am not in your voice channel',
                ephemeral: true
            })
        const queue = client.player.getQueue(interaction.guild)
        if (!queue || !queue.playing)
            return interaction.followUp({
                content: '❌ | No music is being played!'
            })
        const currentTrack = queue.current
        const success = queue.skip()
        return interaction.followUp({content: success ? `✅ | Skipped **${currentTrack.title}**` : '❌ | There are no songs up next or there is an error.'})
    }
}
