const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);

module.exports = async function (client) {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`)
    commandFiles.map((a) => {
        const file = require(a)
        const splitted = a.split('/')
        const directory = splitted[splitted.length - 2]

        if (file.name) {
            const properties = {directory, ...file}
            client.commands.set(file.name, properties)
        }
    })
    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`)
    eventFiles.map((a) => require(a))
    // Slash commands
    const slashCommands = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`)

    const arrayOfSlashCommands = []
    slashCommands.map((value) => {
        const file = require(value)
        if (!file?.name) return
        const splitted = value.split('/')
        const directory = splitted[splitted.length - 2]
        file.directory = directory
        client.slashCommands.set(file.name, file)

        if (['MESSAGE', 'USER'].includes(file.type)) delete file.description
        arrayOfSlashCommands.push(file)
    })

    client.on('ready', () => client.guilds.cache.get('892763477339418655').commands.set(arrayOfSlashCommands).catch(console.log))
}