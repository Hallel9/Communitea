const {CommandInteraction} = require('discord.js')
const Client = require('../../index')
const {Punish} = require('../../util/functions')

module.exports = {
    name: 'ban',
    description: 'ban a member',
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
        const reason = interaction.options.getString('reason') || 'No reason specified.'
        if (user.roles.highest.position >= interaction.member.roles.highest.position) return send('That user is higher than you or has the same highest role as you.')
        if (user.id === interaction.member.id) return send('You cannot ban yourself.')
        if (user.id === interaction.guild.me.id) return send('I cannot ban myself.')
        await Punish(interaction.guild, interaction.user, 'ban', user.user, reason)
        user.send(`You have been banned from \`${interaction.guild.name}\` for \`${reason}\``).catch(() => interaction.followUp("I couldn't dm this user. Are their dms off?"))
        user.ban(reason)
        send(`${user.user.tag} was banned.`)
    }
}
