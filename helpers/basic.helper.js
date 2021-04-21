const chalk = require('chalk');

module.exports = {
    sleep: ms => (
        new Promise((resolve, reject) => setTimeout(() => resolve(), ms))
    ),
    log: (msg, label, color) => {
        try {
            console.log(`[${chalk[color](label)}] ${msg}`);
        } catch (e) {
            console.log(`[${chalk.gray(label)}] ${msg}`);
        }
    }
};