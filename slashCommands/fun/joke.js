const {CommandInteraction} = require('discord.js')
const Client = require('../../index')
const fetch = require('node-fetch')
module.exports = {
    name: 'joke',
    description: 'Get a random joke',
    type: '',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, Discord, send, embed) => {
        fetch('https://api.icndb.com/jokes/random')
            .then((res) => res.json())
            .then((data) => {
                embed.setTitle(data.type).setDescription(`Joke: ${data.value.joke} - ID: ${data.value.id}`)
                send(embed)
            })
    }
}
