const {CommandInteraction} = require('discord.js')
const Client = require('../../index')
const fun = require('fun-responses')

module.exports = {
    name: 'pickup',
    description: 'Get a random pickup line',
    type: '',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, Discord, send, embed) => {
        const pickup = await fun.pickup()
        embed.setTitle('Pickup line')
        embed.setDescription(pickup)
        send(embed)
    }
}
