const conf = new(require('conf'))()

const setToken = (access_token) => {
    conf.set('access_token', access_token)
    return
}

const resetToken = () => {
    conf.clear()
}

const getToken = () => {
    return conf.get('access_token') || ''
}


module.exports = {
    setToken,
    resetToken,
    getToken
}