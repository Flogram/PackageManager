const {
    default: chalk
} = require("chalk")
const prompts = require('prompts');
const fs = require('fs')

const init = async () => {
    console.log(
        chalk.bgCyanBright.black(`Initializing new Flogram Project... \t`)
    )
    console.log('\n')
    console.log(process.cwd())
    const questions = [{
            type: 'text',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'text',
            name: 'description',
            message: 'What is the description of your project?'
        },
        {
            type: 'text',
            name: 'author',
            message: 'Who is the author of your project?'
        },
        {
            type: 'text',
            name: 'version',
            message: 'What is the version of your project?',
            initial: '1.0.0'
        },
        {
            type: 'text',
            name: 'license',
            message: 'What is the license of your project?',
            initial: 'MIT'
        },
        {
            type: 'text',
            name: 'keywords',
            message: 'What are the keywords of your project?'
        },
        {
            type: 'text',
            name: 'main',
            message: 'What is the main file of your project?',
            initial: 'main.flo'
        },
        {
            type: 'text',
            name: 'scripts',
            message: 'What are the scripts of your project?'
        },
        {
            type: 'text',
            name: 'repository',
            message: 'What is the repository of your project?'
        },
        {
            type: 'text',
            name: 'dependencies',
            message: 'What are the dependencies of your project?'
        }
    ]

    const answers = await prompts(questions);
    console.log(answers);
    const dirpath = `${process.cwd()}/${answers.name}`
    console.log(dirpath);
    await fs.promises.mkdir(dirpath, {
        recursive: true
    })

    fs.writeFile(`${dirpath}/${answers.main}`, `#Welcome to ${answers.name}`, function (err, file) {
        if (err) throw err;
        return
    });

}

module.exports = {
    init
}