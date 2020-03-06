const jwt = require('jsonwebtoken');

module.exports = {
    createJWTToken: (payload) => {
        return jwt.sign(payload, 'secretKey', { expiresIn: '12h' })
    }
}