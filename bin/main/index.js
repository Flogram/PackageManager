#! /usr/bin/env node

import { Command } from 'commander';

import { login, signup, signout } from './commands/auth.js';
import { installPackage, installPackages } from './commands/install.js';
import { init } from './commands/init.js';
import { push } from './commands/push.js';

import { start } from './commands/start.js';

const program = new Command();

program.command('login').description('Login to your account').action(login);
program.command('signup').description('Create account').action(signup);
program.command('logout').description('Logout of your account').action(signout);

program.command('install').description('Install a packages').action(installPackages);
program.command('install <package>').description('Install a package').action(installPackage);

program.command('init').description('Initialize a new Flogram project').action(init);

program
	.command('push')
	.argument('<message>', 'Your commit message')
	.description('Pushing current project changes')
	.action(push);

program
	.command('run')
	.argument('path', 'File path')
	.argument('procedure', 'Procedure name')
	.option('--args <args...>', 'specify inputs')
	.description('Runs Flogram procedure in a specified file path')
	.action(start);

program.parse();
