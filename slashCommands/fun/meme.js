const {CommandInteraction} = require('discord.js')
const Client = require('../../index')
const fetch = require('node-fetch')
module.exports = {
    name: 'meme',
    description: 'Get a random meme',
    type: '',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, Discord, send, embed) => {
        fetch('https://meme-api.herokuapp.com/gimme')
            .then((res) => res.json())
            .then((data) => {
                embed.setTitle(data.title).setImage(data.url).setColor('RANDOM').setAuthor(interaction.user.tag)
                send(embed)
            })
    }
}
