import * as chalk from 'chalk';
import * as prompts from 'prompts';
import * as axios from 'axios';
import * as API from '../config/api.js';
import * as UserToken from '../helpers/userToken.js';

const { API_URL } = API;
const { setToken, resetToken } = UserToken;

export const login = async () => {
	const { username, password } = await prompts([
		{
			type: 'text',
			name: 'username',
			message: 'Email/Username:'
		},
		{
			type: 'password',
			name: 'password',
			message: 'Password:'
		}
	]);
	try {
		const res = await axios.post(`${API_URL}/auth/signin`, {
			usernameOrEmail: username,
			password
		});

		if (res) {
			await setToken(res.data.token);
			console.log(chalk.greenBright('Login successful!'));
		} else {
			console.log(chalk.yellowBright('Invalid credentials!'));
		}
	} catch (e) {
		console.log(e);
		console.log('nanana');
		console.log(chalk.redBright('Error: ' + e.response.data.message));
	}
};

export const signup = async () => {
	const { email, username, first_name, last_name, password } = await prompts([
		{
			type: 'text',
			name: 'email',
			message: 'Email:'
		},
		{
			type: 'text',
			name: 'username',
			message: 'Username:'
		},
		{
			type: 'password',
			name: 'password',
			message: 'Password:'
		}
	]);
	try {
		const res = await axios.post(`${API_URL}/auth/signup`, {
			email,
			username,
			first_name,
			last_name,
			password
		});
		if (res) {
			console.log(chalk.greenBright('Signed up successfully!'));
		} else {
			console.log(chalk.yellowBright('Signup failed! Try again'));
		}
	} catch (e) {
		console.log(chalk.redBright('Error: ' + e.response.data.message));
	}
};

export const signout = async () => {
	await resetToken();
	console.log(chalk.greenBright('Signed out successfully!'));
};
