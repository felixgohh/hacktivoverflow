const jwt = require('jsonwebtoken')

module.exports = {
    verify(req, res, next) {
        const token = req.headers['token']
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                res.status(401).json({ message: `Not authenticated user` })
            }
            else {
                next()
            }
        })
    },
    sign(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET)
    }
}