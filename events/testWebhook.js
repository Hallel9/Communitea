const Discord = require('discord.js')
const client = require('../index')

client.on('ready', () => {
    const wc = new Discord.WebhookClient({
        url: 'https://discord.com/api/webhooks/895774654663360562/TTvlPOKjEq90M_KGAZnKN4k61IVlkCAuW4ZrU7antgrjbcRDziZz7T0X36C7t9IEi9YX'
    })
    wc.send({content: 'yes'})
})
