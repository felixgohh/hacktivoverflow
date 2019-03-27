const userModel = require('../models/user')
const bcryptjs = require('../helpers/bcrypt')
const jwt = require('../middlewares/jwt')

class Controller {
    static findAll(req, res) {
        userModel
            .find({})
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static signIn(req, res) {
        userModel
            .findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    res.status(401).json({ message: `wrong email/password` })
                } else {
                    if (bcryptjs.compare(req.body.password, user.password) == false) {
                        res.status(401).json({ message: `wrong email/password` })
                    }
                    else {
                        const payload = {
                            email: user.email
                        }
                        let fullName = `${user.first_name} ${user.last_name}`
                        let token = jwt.sign(payload)
                        res.status(200).json({ token, userId: user._id, name: fullName })
                    }
                }
            })
            .catch(err => {
                if (err.errors.email || err.errors.password) {
                    res.status(409).json(err.message)
                }
                res.status(500).json(err.message)

            })
    }

    static signUp(req, res) {
        userModel
            .create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
            })
            .then(newUser => {
                // queue.create('email', {
                //     email: newUser.email
                // }).save()
                res.status(201).json(newUser)
            })
            .catch(err => {
                if (err.errors.email || err.errors.first_name || err.errors.last_name || err.errors.password) {
                    res.status(409).json(err.message)
                } else {
                    res.status(500).json(err.message)
                }
            })
    }

    static signInGoogle(req, res) {
        let userLoggedIn = null
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
            .then(respone => {
                userLoggedIn = respone.payload
                return userModel.findOne({ email: userLoggedIn.email })
            })
            .then(user => {
                if (user) {
                    res.status(200).json({
                        userId: user._id,
                        message: 'User successfully logged in',
                        token: jwt.sign({ email: user.email }),
                        data: userLoggedIn
                    })
                } else {
                    return userModel.create({
                        first_name: userLoggedIn.given_name,
                        last_name: userLoggedIn.family_name,
                        password: 'google',
                    })
                        .then(newUser => {
                            res.status(201).json({
                                id: newUser._id,
                                message: 'New user created',
                                token: jwt.sign({ email: userLoggedIn.email }),
                                data: userLoggedIn
                            })
                        })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = Controller