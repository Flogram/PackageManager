const conf = new(require('conf'))()

const setToken = () => {

}

const resetToken = () => {

}

const getToken = () => {
    return conf.get('access_token') || ''
}


module.exports = {setToken, resetToken, getToken}