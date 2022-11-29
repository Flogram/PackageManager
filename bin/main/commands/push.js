const {
    default: chalk
} = require("chalk")
const prompts = require('prompts');
const fs = require('fs')

const push = async (message) => {
    console.log(message)
    console.log(`\n` +
        chalk.bgCyanBright.black(`Preparing files in all directiories... \t`)
    )

}

module.exports = {
    push
}