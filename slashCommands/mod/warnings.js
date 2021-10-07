const {CommandInteraction} = require('discord.js')
const Client = require('../../index')
const db = require('../../models/guild-schema')
module.exports = {
    name: 'warnings',
    description: "View a user's warnings",
    type: '',
    options: [
        {
            name: 'user',
            description: "User who's warnings you're viewing",
            type: 'USER',
            required: true
        }
    ],
    permis: ['MANAGE_MESSAGES'],
    botPerms: ['MESSAGE_MESSAGES'],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, Discord, send, embed) => {
        const user = interaction.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(' ')
        db.findOne({Guild: '704879934505615420', userId: user.user.id}, async (err, data) => {
            if (err) throw err
            if (data) {
                interaction.followUp({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setTitle(`${user.user.tag}'s warns`)
                            .setDescription(String(data.Warnings.map((w, i) => `\`${i + 1}\` | Moderator : ${interaction.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}\n`)))
                            .setColor('BLUE')
                    ]
                })
            } else {
                interaction.followUp('User has no data')
            }
        })
    }
}
