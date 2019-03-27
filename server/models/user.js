const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcryptjs = require('../helpers/bcrypt')

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'First Name is required']
    },
    last_name: {
        type: String,
        required: [true, 'Last Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
})

UserSchema.pre('save', function (next) {
    User
        .findOne({ email: this.email })
        .then(data => {
            if (data) {
                throw { errors: { email: 'Email already exist' }, message: 'Email already exist' }
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })

})

UserSchema.pre('save', function (next) {
    try {
        if (this.email) {
            if (validateEmail(this.email) == true) {
                next()
            } else {
                throw { errors: { email: 'Not a valid email format' }, message: 'Not a valid email format' }
            }
        }
    }
    catch (error) {
        next(error)
    }

})

UserSchema.pre('save', function (next) {
    if (this.password) {
        this.password = bcryptjs.hash(this.password)
    }
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User