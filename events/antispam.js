const usersMap = new Map()
const LIMIT = 5
const TIME = 300000
const DIFF = 3000
const client = require('../index')

client.on('messageCreate', async (message) => {
    if (message.author.bot) return
    if (usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id)
        const {lastMessage, timer} = userData
        const difference = message.createdTimestamp - lastMessage.createdTimestamp
        let msgCount = userData.msgCount
        console.log(difference)

        if (difference > DIFF) {
            clearTimeout(timer)
            console.log('Cleared Timeout')
            userData.msgCount = 1
            userData.lastMessage = message
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id)
                console.log('Removed from map.')
            }, TIME)
            usersMap.set(message.author.id, userData)
        } else {
            ++msgCount
            if (parseInt(msgCount) === LIMIT) {
                let muterole = message.guild.roles.cache.find((role) => role.name.toLowerCase() === 'muted')
                if (!muterole) {
                    try {
                        muterole = await message.guild.roles.create({
                            name: 'muted',
                            permissions: []
                        })
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false
                            })
                        })
                    } catch (e) {
                        console.log(e)
                    }
                }
                message.member.roles.add(muterole)
                message.channel.send('You have been muted!').then((m) => setTimeout(() => m.delete()), 5000)
                setTimeout(() => {
                    message.member.roles.remove(muterole)
                    message.channel.send('You have been unmuted!').then((m) => setTimeout(() => m.delete()), 5000)
                }, TIME)
            } else {
                userData.msgCount = msgCount
                usersMap.set(message.author.id, userData)
            }
        }
    } else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id)
            console.log('Removed from map.')
        }, TIME)
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn
        })
    }
})
