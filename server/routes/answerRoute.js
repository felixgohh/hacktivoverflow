const router = require('express').Router()
const answerController = require('../controllers/answerController')
const authenticated = require('../middlewares/jwt')
const authorized = require('../middlewares/authorized')

router.get('/', answerController.findAll)
router.get('/:id', answerController.findById)
router.use(authenticated.verify)
router.post('/', answerController.create)
router.put('/:id', authorized.authAnswer, answerController.update)
router.put('/upvote/:id', answerController.upVote)
router.put('/downvote/:id', answerController.downVote)

module.exports = router