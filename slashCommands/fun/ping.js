const {Message, MessageEmbed} = require('discord.js')
const Client = require('../../index')
const wait = require('util').promisify(setTimeout)

const {CommandInteraction} = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Ping pong',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, Discord, send, embed) => {
        embed.setTitle('Client ping')
        embed.setDescription(`${client.ws.ping}`)
        interaction.followUp({embeds: [embed]})
    }
}
