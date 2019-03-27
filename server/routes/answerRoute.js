const router = require('express').Router()
const answerController = require('../controllers/answerController')

router.get('/', answerController.findAll)
router.post('/', answerController.create)
router.get('/:id', answerController.findById)
router.put('/:id', answerController.update)
router.put('/upvote/:id', answerController.upVote)
router.put('/downvote/:id', answerController.downVote)

module.exports = router