#! /usr/bin/env node

const {
    program
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
    .command('push <message>')
    .description('Pushing current project changes')
    .action(push)
    
program.parse()