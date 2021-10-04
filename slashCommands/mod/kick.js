const {CommandInteraction} = require('discord.js')
const Client = require('../../index')
const {Punish} = require('../../util/functions')

module.exports = {
    name: 'kick',
    description: 'kick a member',
    type: '',
    options: [
        {
            name: 'user',
            description: 'user',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'reason',
            type: 'STRING',
            required: false
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, Discord, send, embed) => {
        const user = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason') || "No reason specified."
        if (user.roles.highest.position >= interaction.member.roles.highest.position) return send('That user is higher than you or has the same highest role as you.')
        if (user.id === interaction.member.id) return send('You cannot kick yourself.')
        if (user.id === interaction.guild.me.id) return send('I cannot kick myself.')
        await Punish(interaction.guild, interaction.user, 'kick', user.user, reason)
        user.send({content: `You have been kicked from \`${interaction.guild.name}\` for \`${reason}\``}).catch(() => send('I couldn\'t dm this user. Are their dms off?'))
        user.kick(reason)
        send(`${user.user.tag} was kicked.`)
    }
}
