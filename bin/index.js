#!/usr/bin/env node

const yargs = require('yargs');

const options = yargs
	.usage('Usage: -n <name>')
	.option('n', {
		alias: 'name',
		describe: 'Your name',
		type: 'string',
		demandOption: true
	})
	.option('s', {
		alias: 'search',
		describe: 'Search term',
		type: 'string'
	}).argv;

const greeting = `Hello, ${options.name}!`;

console.log(greeting);

if (options.search) {
	console.log(options.search);
}
