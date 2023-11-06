import * as fs from 'fs';
import * as prompts from 'prompts';
import * as chalk from 'chalk';

export const init = async () => {
	console.log(`\n` + chalk.bgCyanBright.black(`Initializing new Flogram Project... \t`));
	const questions = [
		{
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
	];

	const answers = await prompts(questions);
	const dirpath = `${process.cwd()}/${answers.name}`;
	await fs.promises.mkdir(dirpath, {
		recursive: true
	});

	const floignoreContent = `{
        "folders": ["build", "downloads", "test"],
        "files": [],
        "extensions": ["exe", "ide"],
        "settings": []
    }`;

	const libContent = `{
        "builtin":"2.0.3"
    }`;

	const configContent = `{
        "name": "${answers.name}",
        "description": "${answers.description}",
        "author": "${answers.author}",
        "version": "${answers.version}",
        "license": "${answers.license}",
        "keywords": "${answers.keywords}",
        "main": "${answers.main}",
        "repository": "${answers.repository}"
    }`;
	console.log(`\n` + chalk.blue(`Creating project files... \t`));
	console.log(`\n` + chalk.blueBright(`Creating project main entry... \t`));
	fs.writeFile(`${dirpath}/${answers.main}`, `#Welcome to ${answers.name}`, function (err, file) {
		if (err) throw err;
	});

	console.log(chalk.blueBright(`Creating Flohub ignore defaults... \t`));
	fs.writeFile(`${dirpath}/floignore.json`, floignoreContent, function (err, file) {
		if (err) throw err;
	});

	console.log(chalk.blueBright(`Configuring library file... \t`));
	fs.writeFile(`${dirpath}/libs.json`, libContent, function (err, file) {
		if (err) throw err;
	});

	console.log(chalk.blueBright(`Configuring project details file... \t`));
	fs.writeFile(`${dirpath}/config.json`, configContent, function (err, file) {
		if (err) throw err;
	});

	console.log(chalk.green(`Project created successfully... \t`));

	console.log(`\n` + chalk.cyan(`To run your project,  run the following commands \t`));

	console.log(`\n` + chalk.cyan(`1. cd ${answers.name} \t`));

	console.log(chalk.cyan(`2. flo start \t`));

	console.log(`\n\n` + chalk.greenBright(`Happy coding\t`) + `\n`);
};
