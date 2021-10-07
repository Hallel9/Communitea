const client = require('../index'),
    Discord = require('discord.js'),
    db = require('../models/guild-schema')
client.on('ready', () => {
    const embed = new Discord.MessageEmbed().setTitle('Verification').setColor('GREEN')
    // client.channels.cache.get('893112833091469422').send({embeds: [embed]}).catch(console.log)
    embed.setDescription('Type `' + client.code + '` to get verified.')
    client.channels.cache.get('893112833091469422').messages.edit('894413928904405022', {embeds: [embed]})

    setInterval(() => {
        client.code = client.ID(5)
        embed.setDescription('Type `' + client.code + '` to get verified.')
        client.channels.cache.get('893112833091469422').messages.edit('894413928904405022', {embeds: [embed]})
    }, 120000)
})
client.on('messageCreate', async (message) => {
    if (message.author.id == client.user.id) return
    if (message.channel.id != '893112833091469422') return
    await message.delete()
    if (message.content == client.code) {
        await message.member.roles.add('893112313119404082')
        await db.findOneAndUpdate({Guild: message.guild.id, UserID: message.author.id}, {verified: true})
    }
})
client.on('guildMemberAdd', async (member) => {
    const hasDb = await db.findOne({Guild: member.guild.id, UserID: member.id})
    if (!hasDb) return await db.create({Guild: member.guild.id, UserID: member.id, verified: false})
    if (hasDb.verified) await member.roles.add('893112313119404082')
})
