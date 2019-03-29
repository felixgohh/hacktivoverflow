const router = require('express').Router()
const questionController = require('../controllers/questionController')
const authenticated = require('../middlewares/jwt')
const authorized = require('../middlewares/authorized')

router.get('/', questionController.findAll)
router.get('/:id', questionController.findById)
router.use(authenticated.verify)
router.post('/', questionController.create)
router.put('/:id', authorized.authQuestion, questionController.update)
router.delete('/:id', authorized.authQuestion, questionController.delete)
router.put('/upvote/:id', questionController.upVote)
router.put('/downvote/:id', questionController.downVote)

module.exports = router