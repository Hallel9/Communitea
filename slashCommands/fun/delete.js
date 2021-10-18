// Normal non slash command

const Client = require('../../index')
const fetch = require('node-fetch')
const {
	Message,
	CommandInteraction,
	MessageActionRow,
	MessageButton,
	MessageSelectMenu,
} = require('discord.js')
const discord = require('discord.js')

module.exports = {
	name: 'delete',
	description: 'Delete image',
	options: [
		{
			name: 'user',
			description: "User who's avatar will be deleted.",
			type: 'USER',
			required: true,
		},
	],
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 * @param {discord} Discord
	 * @param {*} send
	 */
	run(client, interaction, args, Discord, send) {
		const member = interaction.guild.members.cache.get(args[0])
		send(
			`http://luminabot.xyz/api/image/delete?image=${member.user.displayAvatarURL(
				{ format: 'png' },
			)}`,
		)
	},
}
