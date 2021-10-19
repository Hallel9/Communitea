const client = require('../index')

client.player.on('trackStart', (queue, track) =>
	queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`),
)
