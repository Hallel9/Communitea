const {CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
const Client = require('../../index')
const {Punish} = require('../../util/functions')

module.exports = {
    name: 'moderate',
    description: 'Click a button to perform an action on a user.',
    permis: ['KICK_MEMBERS', 'BAN_MEMBERS'],
    options: [
        {
            name: 'user',
            description: 'The user to perform the action on.',
            required: true,
            type: 'USER'
        },
        {
            name: 'reason',
            description: 'The reason for the action.',
            required: false,
            type: 'STRING'
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * @param {MessageEmbed} embed
     */
    run: async (client, interaction, args, Discord, send, embed) => {
        const member = interaction.options.getMember('user')
        if (member.roles.highest.position >= interaction.member.roles.highest.position) return send('That user is higher than you or has the same role as you.')
        if (member.roles.highest.position >= interaction.guild.me.roles.highest.position) return send('That user is higher than me or has the same role as me.')
        if (member.id === interaction.member.id) return send('You cannot moderate yourself.')
        if (member.id === interaction.guild.ownerID) return send('You cannot moderate the server owner.')
        if (member.id === client.user.id) return send('You cannot moderate me.')
        const reason = interaction.options.getString('reason') || 'No reason specified.'

        const kick = new MessageButton().setCustomId('kick').setLabel('Kick').setStyle('DANGER')
        const ban = new MessageButton().setCustomId('ban').setLabel('Ban').setStyle('DANGER')
        let row = new MessageActionRow().addComponents(kick, ban)

        const collector = interaction.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 10000})
        interaction.followUp({content: 'Select an action to perform', components: [row]})

        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'kick') {
                await Punish(interaction.guild, interaction.user, 'kick', member.user, reason)
                member.kick(reason)
                ban.setDisabled(true)
                kick.setDisabled(true)
                row = new MessageActionRow().addComponents(kick, ban)
                interaction.update({content: `${member.user.tag} has been kicked.`})
            }
            if (interaction.customId === 'ban') {
                member.ban(reason)
                ban.setDisabled(true)
                kick.setDisabled(true)
                row = new MessageActionRow().addComponents(kick, ban)
                interaction.update({content: `${member.user.tag} has been banned.`})
            }
        })
    }
}
