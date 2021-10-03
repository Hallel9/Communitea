const client = require('../index'), chalk = require('chalk');
client.on('ready', () => console.log(chalk.green('Logged in as ' + client.user.tag)))
client.on('debug', (a) => console.log(chalk.grey(a)))
client.on('rateLimit', (rate) => console.log(chalk.yellowBright(`Rate limited: Timeout: ${rate.timeout}\nLimit: ${rate.limit}\nRoute: ${rate.route}`)))
process.on('unhandledRejection', (err) => console.log(chalk.red('Unhandled Promise Rejection Warning:\nStack: ' + err.stack)))
process.on('uncaughtException', (err) => console.log(chalk.red('Uncaught Exception:\nStack: ' + err.stack)))