const {CommandInteraction} = require('discord.js')
const Client = require('../../index')

module.exports = {
    name: 'test',
    description: 'Test webhook',
    type: '',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, Discord, send, embed) => {
        send('** **')
        const wc = new Discord.WebhookClient({
            url: 'https://discord.com/api/webhooks/895774654663360562/TTvlPOKjEq90M_KGAZnKN4k61IVlkCAuW4ZrU7antgrjbcRDziZz7T0X36C7t9IEi9YX'
        })
        return wc.send({content: 'yes'})
    }
}
