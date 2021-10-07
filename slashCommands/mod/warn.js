const {CommandInteraction} = require('discord.js')
const Client = require('../../index')
const db = require('../../models/guild-schema')

module.exports = {
    name: 'warn',
    description: 'Warn a user',
    type: '',
    permis: ['MANAGE_MESSAGES'],
    botPerms: ['MANAGE_MESSAGES'],
    options: [
        {
            name: 'user',
            description: 'The user to warn',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the warning',
            type: 'STRING',
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, Discord, send, embed) => {
        const user = interaction.guild.members.cache.get(args[0])
        const reason = interaction.options.getString('reason')
        db.findOne({Guild: '704879934505615420', userId: user.user.id}, async (err, data) => {
            if (err) throw err
            if (!data) {
                data = new db({
                    Guild: '704879934505615420',
                    userId: user.user.id,
                    Warnings: [
                        {
                            moderator: interaction.user.id,
                            reason: reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: interaction.user.id,
                    reason: reason
                }
                data.Warnings.push(obj)
            }
            data.save()
            if (data.Warnings.length === 3) {
                user.roles.add('892763477771427883')
                interaction.followUp({content: `${user.user.tag} has been muted for 3 hours.`})
                setTimeout(() => user.roles.remove('892763477771427883'), 10800000)
                interaction.followUp({content: `${user.user.tag} has been unmuted.`})
            }
            if (data.Warnings.length === 6) {
                user.roles.add('892763477771427883')
                interaction.followUp({content: `${user.user.tag} has been muted for 3 hours.`})
                setTimeout(() => user.roles.remove('892763477771427883'), 21600000)
                interaction.followUp({content: `${user.user.tag} unmuted`})
            }
        })
        user.send({embeds: [new Discord.MessageEmbed().setDescription(`You have been warned for ${reason}`).setColor('RED')]})
        interaction.followUp({embeds: [new Discord.MessageEmbed().setDescription(`Warned ${user} for ${reason}`).setColor('BLUE')]})
    }
}
