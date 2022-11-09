const prompts = require('prompts');
const chalk = require('chalk')
const axios = require('axios')
const conf = new (require('conf'))()


const login = async () => {
    const { email, password } = await prompts([
        {
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
    const res = await axios.post('https://lobster-app-ll2jc.ondigitalocean.app/website-backend2/api/auth/signup', {
        email,
        username,
        first_name,
        last_name,
        password
    })

    if(res){
        console.log(chalk.greenBright("Logged in successfully!"))
        conf.set('token', res.data.token)
    }
    else{
        console.log(chalk.redBright("Invalid credentials!"))
    }
}

const signup = async () => {
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
            type: 'text',
            name: 'first_name',
            message: 'First Name:'
        },
        {
            type: 'text',
            name: 'last_name',
            message: 'Last Name:'
        },
        {
            type: 'password',
            name: 'password',
            message: 'Password:'
        }
    ])
    const res = await axios.post('https://lobster-app-ll2jc.ondigitalocean.app/website-backend2/api/auth/signup', {
        email,
        username,
        first_name,
        last_name,
        password
    })
    if(res){
        console.log(
            chalk.greenBright("Signed up successfully!")
            )
    }
    else{
        console.log(
            chalk.yellowBright("Email already used!")
            )
    }
}

const signout = async () => {
    conf.clear()
    console.log(
        chalk.greenBright("Signed out successfully!")
        )
}
 module.exports = {login, signup, signout}