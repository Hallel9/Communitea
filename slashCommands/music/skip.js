const { Message, MessageEmbed } = require('discord.js')
const Client = require('../../index')
const wait = require('util').promisify(setTimeout)

const { CommandInteraction } = require('discord.js')
const { player } = require('../../index')

module.exports = {
	name: 'skip',
	description: 'Skip a song',
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
		const currentTrack = queue.current
		const tracks = queue.tracks.slice(0, 10).map((m, i) => {
			return `${i + 1} **${m.title}** ([link](${m.url}))`
		})

		return interaction.followUp({
			embeds: [
				{
					title: 'Server Queue',
					description: `${tracks.join('\n')}${
						queue.tracks.length > tracks.length
							? `\n...${
									queue.tracks.length - tracks.length === 1
										? `${
												queue.tracks.length -
												tracks.length
										  } more track`
										: `${
												queue.tracks.length -
												tracks.length
										  } more tracks`
							  }`
							: ''
					}`,
					color: 0xff0000,
					fields: [
						{
							name: 'Now Playing',
							value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))`,
						},
					],
				},
			],
		})
	},
}
