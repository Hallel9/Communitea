const client = require('../index')
const Discord = require('discord.js')

client.on('interactionCreate', async (interaction) => {

    function send(txt, ...components) {
        return new Promise((resolve, reject) =>
            interaction
                .followUp(typeof txt == 'object' ? { embeds: [txt], components } : { content: txt, components })
                .then(resolve, reject)
        )
    }
    if (interaction.isButton()) {}
})