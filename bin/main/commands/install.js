const {
    default: chalk
} = require("chalk")

const installPackages = () => {
    console.log('\n' +
        chalk.bgCyanBright.black(`Installing packages...`) + '\n'
    )
}

const installPackage = (package) => {
    console.log('\n' +
        chalk.bgCyanBright.black(`Installing ${package}...`) + '\n'
    )
}

module.exports = {
    installPackage,
    installPackages
}