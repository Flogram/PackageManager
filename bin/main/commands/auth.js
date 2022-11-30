const prompts = require('prompts');
const chalk = require('chalk')
const axios = require('axios');
const { API_URL } = require('../config/api');
const { setToken, resetToken } = require('../helpers/userToken');
const conf = new(require('conf'))()



const login = async () => {
    const {
        username,
        password
    } = await prompts([{
            type: 'text',
            name: 'username',
            message: 'Username:'
        },
        {
            type: 'password',
            name: 'password',
            message: 'Password:'
        }
    ])
    try {
        const res = await axios.post(`${API_URL}/auth/signin`, {
            username,
            password
        })

        if (res) {
            await setToken(res.data.token);
            console.log(chalk.greenBright("Login successful!"))
            
        } else {
            console.log(chalk.yellowBright("Invalid credentials!"))
        }
    } catch (e) {
        console.log(chalk.redBright("Error: " +
            e.response.data.message))
    }
}

const signup = async () => {
    const {
        email,
        username,
        first_name,
        last_name,
        password
    } = await prompts([{
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
    ])
    try {
        const res = await axios.post(`${API_URL}/auth/signup`, {
            email,
            username,
            first_name,
            last_name,
            password
        })
        if (res) {
            console.log(
                chalk.greenBright("Signed up successfully!")
            )
        } else {
            console.log(
                chalk.yellowBright("Signup failed! Try again")
            )
        }
    } catch (e) {
        console.log(chalk.redBright("Error: " +
            e.response.data.message))
    }
}

const signout = async () => {
    await resetToken()
    console.log(
        chalk.greenBright("Signed out successfully!")
    )
}
module.exports = {
    login,
    signup,
    signout
}