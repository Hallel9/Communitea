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
	name: 'mock',
	description: 'Mocks text',
	options: [
		{
			name: 'text',
			description: 'Text to mock',
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
		fetch(`http://luminabot.xyz/api/text/mock?text=${args.join(' ')}`)
			.then((res) => res.json())
			.then((data) => {
				send(data.text)
			})
	},
}
