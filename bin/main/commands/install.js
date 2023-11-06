import chalk from 'chalk';

export const installPackages = () => {
	console.log('\n' + chalk.bgCyanBright.black(`Installing packages...`) + '\n');
};

export const installPackage = (pkg) => {
	console.log('\n' + chalk.bgCyanBright.black(`Installing ${pkg}...`) + '\n');
};
