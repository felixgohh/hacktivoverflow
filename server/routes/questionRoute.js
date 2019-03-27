const router = require('express').Router()
const questionController = require('../controllers/questionController')

router.get('/', questionController.findAll)
router.get('/:id', questionController.findById)
router.post('/', questionController.create)
router.put('/:id', questionController.update)
router.delete('/:id', questionController.delete)
router.put('/upvote/:id', questionController.upVote)
router.put('/downvote/:id', questionController.downVote)

module.exports = router