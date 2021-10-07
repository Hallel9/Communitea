const client = require('../index')
const Discord = require('discord.js')
const fs = require('fs')
const Mod = require('../models/guild-schema')
const {ClientRequest} = require('http')
client.on('interactionCreate', async (interaction) => {
    function send(txt, ...components) {
        return new Promise((resolve, reject) => interaction.followUp(typeof txt == 'object' ? {embeds: [txt], components} : {content: txt, components}).then(resolve, reject))
    }
    if (interaction.isCommand()) {
        await interaction.deferReply({ephemeral: false}).catch(() => {})
        const cmd = client.slashCommands.get(interaction.commandName)
        if (!cmd) return interaction.followUp({content: 'An error has occured '})
        const args = []

        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name)
                option.options?.forEach((x) => {
                    if (x.name) args.push(x.name)
                    if (x.value) args.push(x.value)
                })
            } else if (option.value) args.push(option.value)
        }
        const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTimestamp()
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true}))
        if (cmd.dev && !client.owners.includes(interaction.user.id)) {
            embed.setTitle('Not a dev')
            embed.setDescription('You are not a developer.')
            embed.setColor('RED')
            return interaction.followUp({embeds: [embed]})
        }
        if (cmd.permis && !client.owners.includes(interaction.user.id)) {
            for (const perm of cmd.permis) {
                if (!client.config.permissions.includes(perm)) throw new Error('That permission node does not exist.')
                if (!interaction.member.permissions.has(perm)) {
                    embed.setTitle('INVALID PERMISSIONS')
                    embed.setDescription(`You do not have the permission node ${perm}`)
                    embed.setColor('RED')
                    return interaction.followUp({embeds: [embed]})
                }
            }
        }
        try {
            await cmd.run(client, interaction, args, Discord, send, embed)
        } catch (err) {
            fs.appendFileSync('./errors.log', `Error in ${cmd.name}: ${err.stack}\n\n`)
            console.log(err)
            embed.setTitle('An error occured.').setDescription('Please try again later.').setColor('RED').addField('Error', err.message)
            return send(embed)
        }
    }
})
