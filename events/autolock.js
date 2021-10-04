const client = require('../index')

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return
    let i = 0;
    message.mentions.users.forEach(a => i++)
    message.mentions.roles.forEach(a => i++)
    console.log(i)
    if (i >= 15) {
        await message.member.roles.add('892763477771427883')
        message.channel.send({
            content: message.author.username + ' has been muted for `mass mentions`. Talk to a staff if you believe this was a mistake.'
        })
    } 
})