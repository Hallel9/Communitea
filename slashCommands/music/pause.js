const { Message, MessageEmbed } = require('discord.js')
const Client = require('../../index')
const wait = require('util').promisify(setTimeout)

const { CommandInteraction } = require('discord.js')
const { player } = require('../../index')

module.exports = {
	name: 'pause',
	description: 'Pause music',
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction, args, Discord, send, embed) => {
		if (!interaction.member.voice.channel)
			return await interaction.reply({
				content: 'You must be in a voice channel',
				ephemeral: true,
			})
		if (
			interaction.guild.me.voice.channelId &&
			interaction.member.voice.channelId !==
				interaction.guild.me.voice.channelId
		)
			return await interaction.reply({
				content: 'I am not in your voice channel',
				ephemeral: true,
			})
		const queue = client.player.getQueue(interaction.guild)
		if (!queue || !queue.playing)
			return interaction.followUp({
				content: '❌ | No music is being played!',
			})
		const paused = await queue.setPaused(true)
		return interaction.followUP({
			content: paused ? '⏸ | Paused!' : '❌ | Something went wrong!',
		})
	},
}
