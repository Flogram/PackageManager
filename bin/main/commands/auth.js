const prompts = require('prompts');
const chalk = require('chalk')
const axios = require('axios')
const conf = new(require('conf'))()

const API = 'https://lobster-app-ll2jc.ondigitalocean.app';


const login = async () => {
    const {
        email,
        password
    } = await prompts([{
            type: 'text',
            name: 'email',
            message: 'Email:'
        },
        {
            type: 'password',
            name: 'password',
            message: 'Password:'
        }
    ])
    try {
        const res = await axios.post(`${API}/auth/signin`, {
            email,
            password
        })

        if (res) {
            console.log(chalk.greenBright("Logged in successfully!"))
            conf.set('token', res.data.token)
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
        const res = await axios.post(`${API}/auth/signup`, {
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
    conf.clear()
    console.log(
        chalk.greenBright("Signed out successfully!")
    )
}
module.exports = {
    login,
    signup,
    signout
}