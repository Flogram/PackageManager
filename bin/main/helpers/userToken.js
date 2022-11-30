const conf = new(require('conf'))()

const setToken = () => {
    conf.set('access_token', res.data.access_token)
    return
}

const resetToken = () => {
    conf.clear()
}

const getToken = () => {
    return conf.get('access_token') || ''
}


module.exports = {setToken, resetToken, getToken}