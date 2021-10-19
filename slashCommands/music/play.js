const { Message, MessageEmbed } = require('discord.js')
const Client = require('../../index')
const wait = require('util').promisify(setTimeout)

const { CommandInteraction } = require('discord.js')
const { player } = require('../../index')

module.exports = {
	name: 'play',
	description: 'Play music',
	options: [
		{
			name: 'song',
			description: 'Song to play',
			type: 'STRING',
			required: true,
		},
	],
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
		const query = interaction.options.getString('song')
		const queue = client.player.createQueue(interaction.guild, {
			ytdlOptions: {
				quality: 'highest',
				filter: 'audioonly',
				highWaterMark: 1 << 25,
				dlChunkSize: 0,
			},
			metadata: {
				channel: interaction.channel,
			},
		})

		try {
			if (!queue.connection)
				await queue.connect(interaction.member.voice.channel)
		} catch {
			queue.destroy()
			return await interaction.reply({
				content: 'Could not join your voice channel.',
			})
		}
		const track = await client.player
			.search(query, {
				requestedBy: interaction.user,
			})
			.then((x) => x.tracks[0])
		if (!track)
			return await interaction.followUp({
				content: `❌ | Track **${query}** not found!`,
			})
		queue.play(track)
	},
}
