#! /usr/bin/env node

const { program } = require('commander')

const {login, signup, signout} = require('./commands/auth')


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

    program.parse()