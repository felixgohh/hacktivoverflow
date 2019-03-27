const cartModel = require('../models/cart')

module.exports = (req, res, next) => {
    let userId = req.headers.authorized
    let cartId = req.headers.cartid

    cartModel
        .findById(cartId)
        .then(cart => {
            if (cart.userId == userId) {
                next()
            } else {
                throw new Error('Not authorized to complete action')
            }
        })
        .catch(err => {
            res.status(401).json(err)
        })

}