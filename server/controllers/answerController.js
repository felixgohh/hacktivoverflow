const answerModel = require('../models/answer')

class Controller {
  static findAll(req, res) {
    let condition = {}
    if (req.query.search) {
      condition = {
        questionId: req.query.search
      }
    } else if (req.query.user) {
      condition = {
        userId: req.query.user
      }
    }

    answerModel
      .find(condition)
      .populate('questionId')
      .populate('userId')
      .then(answers => {
        res.status(200).json(answers)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findById(req, res) {
    answerModel
      .findById(req.params.id)
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static create(req, res) {
    answerModel
      .create({
        title: req.body.title,
        description: req.body.description,
        upvotes: [],
        downvotes: [],
        questionId: req.body.questionId,
        userId: req.body.userId
      })
      .then(newAnswer => {
        res.status(201).json(newAnswer)
      })
      .catch(err => {
        if (err.errors.title || err.errors.description || err.errors.upvotes || err.errors.downvotes || err.errors.questionId || err.errors.userId) {
          res.status(409).json(err.errors)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static update(req, res) {
    answerModel
      .findByIdAndUpdate(req.params.id, { ...req.body })
      .then(updatedAnswer => {
        res.status(200).json(updatedAnswer)
      })
      .catch(err => {
        if (err.errors.title || err.errors.description || err.errors.upvotes || err.errors.downvotes || err.errors.questionId) {
          res.status(409).json(err.errors)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static upVote(req, res) {
    answerModel
      .findById(req.params.id)
      .then(answer => {
        let downindex = 0
        let downvoter = false

        answer.downvotes.forEach((e, index) => {
          if (e == req.body.userId) {
            downindex = index
            downvoter = true
          }
        })

        answer.upvotes.forEach((e) => {
          if (e == req.body.userId) {
            throw new Error('You are not allowed to up vote anymore')
          }
        })

        if (downvoter == true) {
          answer.downvotes.splice(downindex, 1)
        } else {
          answer.upvotes.push(req.body.userId)
        }

        return answerModel.findByIdAndUpdate(req.params.id, answer, { new: true })
      })
      .then(updatedAnswer => {
        res.status(200).json(updatedAnswer)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static downVote(req, res) {
    answerModel
      .findById(req.params.id)
      .then(answer => {
        let upindex = 0
        let upvoter = false

        answer.upvotes.forEach((e, index) => {
          if (e == req.body.userId) {
            upindex = index
            upvoter = true
          }
        })

        answer.downvotes.forEach((e) => {
          if (e == req.body.userId) {
            throw new Error('You are not allowed to down vote anymore')
          }
        })

        if (upvoter == true) {
          answer.upvotes.splice(upindex, 1)
        } else {
          answer.downvotes.push(req.body.userId)
        }

        return answerModel.findByIdAndUpdate(req.params.id, answer, { new: true })
      })
      .then(updatedAnswer => {
        res.status(200).json(updatedAnswer)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = Controller