const prompts = require('prompts');
const axios = require('axios')
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
        console.log("Logged in successfully!")
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
        console.log("Signed up successfully!")
    }
}
 module.exports = {login,signup}