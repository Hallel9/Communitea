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
	name: 'yomama',
	description: 'Yo mama',
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
		fetch('http://luminabot.xyz/api/json/yomama')
			.then((res) => res.json())
			.then((data) => {
				const embed = new Discord.MessageEmbed()
					.setTitle('Yo Mama')
					.setAuthor(
						interaction.user.tag,
						interaction.user.displayAvatarURL({ dynamic: true }),
					)
					.setDescription(data.yomama)
					.setColor('FUCHSIA')
				send(embed)
			})
	},
}
