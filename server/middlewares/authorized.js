const questionModel = require('../models/question')
const answerModel = require('../models/answer')

module.exports = {
    authQuestion(req,res,next){
        let userId = req.headers.authorized
        let questionId = req.headers.questionid
    
        questionModel
            .findById(questionId)
            .then(question => {
                if (question.userId == userId) {
                    next()
                } else {
                    throw new Error('Not authorized to complete action')
                }
            })
            .catch(err => {
                res.status(401).json(err)
            })
    },
    authAnswer(req,res,next){
        let userId = req.headers.authorized
        let answerId = req.headers.answerid
    
        answerModel
            .findById(answerId)
            .then(answer => {
                if (answer.userId == userId) {
                    next()
                } else {
                    throw new Error('Not authorized to complete action')
                }
            })
            .catch(err => {
                res.status(401).json(err)
            })
    }
}