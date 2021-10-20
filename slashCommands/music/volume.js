// Normal non slash command
const Client = require('../../index')
const {
	Message,
	CommandInteraction,
	MessageActionRow,
	MessageButton,
	MessageSelectMenu,
} = require('discord.js')
const discord = require('discord.js')
module.exports = {
	name: 'volume',
	description: 'Change or check the volume of the current song',

	options: [
		{
			name: 'percentage',
			description: 'Percentage to change the volume to',
			required: false,
			type: 'INTEGER',
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
	run: async (client, interaction, args, Discord, send) => {
		if (!interaction.member.voice.channel)
			return interaction.followUp({
				content: '🛑 | You are not in a voice channel',
			})
		if (
			interaction.guild.me.voice.channel &&
			!interaction.member.voice.channelId ===
				interaction.guild.me.voice.channelId
		)
			return interaction.followUp({
				content: '🛑 | You are not in my voice channel.',
			})
		const volumePercent = interaction.options.getInteger('percentage')
		const queue = client.player.getQueue(interaction.guildId)
		if (!queue?.playing)
			return interaction.followUp({
				content: '❌ | There is no music playing.',
			})
		if (!volumePercent)
			return interaction.followUp({
				content: `The current volume is \`${queue.volume}%\``,
			})
		if (volumePercent < 0 || volumePercent > 100)
			return interaction.followUp({
				content: '🛑 | The volume must be in between 1 and 100',
			})
		queue.setVolume(volumePercent)
		return interaction.followUp({
			content: `✔ | Volume has been set to \`${volumePercent}%\``,
		})
	},
}
