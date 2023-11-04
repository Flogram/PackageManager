#! /usr/bin/env node

const {
    Command
} = require('commander')

const {
    login,
    signup,
    signout
} = require('./commands/auth')
const {
    installPackage,
    installPackages
} = require('./commands/install')
const {
    init
} = require('./commands/init')
const {
    push
} = require('./commands/push')

const {
    run
} = require('./commands/run')

const program = new Command();

program
    .command('login')
    .description('Login to your account')
    .action(login)
program
    .command('signup')
    .description('Create account')
    .action(signup)
program
    .command('logout')
    .description('Logout of your account')
    .action(signout)

program
    .command('install')
    .description('Install a packages')
    .action(installPackages)
program
    .command('install <package>')
    .description('Install a package')
    .action(installPackage)

program
    .command('init')
    .description('Initialize a new Flogram project')
    .action(init)

program
    .command('push')
    .argument('<message>', 'Your commit message')
    .description('Pushing current project changes')
    .action(push)

program
    .command('run')
    .argument('path', 'File path')
    .description('Runs Flogram Code in a specified file path')
    .action(run)
    
program.parse()