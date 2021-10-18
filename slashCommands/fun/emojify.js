// Normal non slash command
const Client = require('../../index')
const fetch = require('node-fetch')
const {
	Message,
	CommandInteraction,
	MessageActionRow,
	MessageButton,
	MessageSelectMenu,
	MessageEmbed,
} = require('discord.js')
const discord = require('discord.js')
module.exports = {
	name: 'emojify',
	description: 'Emojify text',
	options: [
		{
			name: 'text',
			description: 'Text to emojify',
			required: true,
			type: 'STRING',
		},
	],
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 * @param {discord} Discord
	 * @param {*} send
	 * @param {MessageEmbed} embed
	 */
	run: async (client, interaction, args, Discord, send) => {
		fetch('https://luminabot.xyz/api/text/emojify?text=' + args.join(' '))
			.then((res) => res.json())
			.then((data) => {
				send(data.emojifyed)
			})
	},
}
