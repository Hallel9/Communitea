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
	name: 'crypto',
	description: 'Crypto',
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
		fetch('http://luminabot.xyz/api/json/catfacts')
			.then((res) => res.json())
			.then((data) => {
				const embed = new Discord.MessageEmbed()
					.setTitle('Cat Fact')
					.setDescription(data.fact)
					.setFooter(
						'Check out http://luminabot.xyz/api for more stuff.',
					)
				send(embed)
			})
	},
}
