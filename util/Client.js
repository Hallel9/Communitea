const {Client, Collection} = require('discord.js')
const {connect} = require('mongoose')
const chalk = require('chalk')
require('dotenv').config()
const {Player} = require('discord-player')
module.exports = class extends Client {
    constructor() {
        super({
            allowedMentions: {
                parse: []
            },
            intents: 32767
        })
        this.commands = new Collection()
        this.slashCommands = new Collection()
        this.owners = ['241632903258177536', '513773028606476308']
        this.db(process.env.mongo)
        this.login(process.env.token)
        this.setStatus(['over communitea server'])
        this.automod = new Map()
        this.code = this.ID(5)
        this.config = require('../config')
        this.player = new Player(this)
    }
    db(s) {
        connect(s, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => console.log(chalk.green('Connected to mongo')))
            .catch(() => console.log(chalk.red('Failed to connect to mongo')))
    }
    setStatus(a) {
        setInterval(
            () =>
                this.user.setActivity(a[Math.floor(Math.random() * a.length)], {
                    type: 'WATCHING'
                }),
            20000
        )
    }
    init = require('./handlers')(this)
    log(...args) {
        console.log(chalk.green(`[${new Date().toLocaleString()}] -`, ...args))
    }
    ID(length) {
        let res = ''
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < length; i++) {
            res += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return res
    }
}
