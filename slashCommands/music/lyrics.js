const { Message, MessageEmbed } = require('discord.js')
const Client = require('../../index')
const wait = require('util').promisify(setTimeout)

const { CommandInteraction } = require('discord.js')
const axios = require('axios')
const getLyrics = async (title) => {
	const url = new URL('https://some-random-api.ml/lyrics')
	url.searchParams.append('title', title)

	const { data } = await axios.get(url.href)
	return data
}

const substring = (length, value) => {
	const replaced = value.replace(/\n/g, '--')
	const regex = `.{1, ${length}}`
	const lines = replaced
		.match(regex, 'g')
		.map((line) => line.replace(/--/g, '\n'))
	return lines
}

const createEmbeds = async (title) => {
	const data = await getLyrics(title)

	return substring(4096, data.lyrics).map((value, index) => {
		const isFirst = index === 0

		return new MessageEmbed({
			title: isFirst ? `${data.title} - ${data.author}` : null,
			thumbnail: isFirst ? { url: data.thumbnail.genius } : null,
			description: value,
		})
	})
}
module.exports = {
	name: 'lyrics',
	description: 'Display lyrics for the current song or a specific song.',
	options: [
		{
			name: 'songtitle',
			description: 'Specific song for lyrics',
			type: 'STRING',
			required: false,
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
		const query = interaction.options.getString('songtitle')
		const sendLyrics = (songTitle) => {
			return createEmbeds(songTitle).then((embeds) =>
				interaction.followUp({ embeds }).catch(console.log),
			)
		}

		if (query) return sendLyrics(query)
		const queue = client.player.getQueue(interaction.guildId)
		if (!queue?.playing)
			return interaction.followUp({
				content: 'No music is currently playing',
			})

		return sendLyrics(queue.current.title)
	},
}
