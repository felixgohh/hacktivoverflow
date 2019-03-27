const questionModel = require('../models/question')

class Controller {
  static findAll(req, res) {
    let condition = {}
    if (req.query.search) {
      condition = {
        userId: req.query.search
      }
    }

    questionModel
      .find(condition)
      .populate('userId')
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findById(req, res) {
    questionModel
      .findById(req.params.id)
      .populate('userId')
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static create(req, res) {
    questionModel
      .create({
        title: req.body.title,
        description: req.body.description,
        upvotes: [],
        downvotes: [],
        userId: req.body.userId
      })
      .then(newQuestion => {
        res.status(201).json(newQuestion)
      })
      .catch(err => {
        if (err.errors.title || err.errors.description || err.errors.upvotes || err.errors.downvotes || err.errors.userId) {
          res.status(409).json(err.errors)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static update(req, res) {
    questionModel
      .findByIdAndUpdate(req.params.id, { ...req.body })
      .then(updatedQuestion => {
        res.status(200).json(updatedQuestion)
      })
      .catch(err => {
        if (err.errors.title || err.errors.description || err.errors.upvotes || err.errors.downvotes || err.errors.userId) {
          res.status(409).json(err.errors)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static delete(req, res) {
    questionModel
      .findByIdAndDelete(req.params.id)
      .then(deletedQuestion => {
        res.status(200).json(deletedQuestion)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static upVote(req, res) {
    questionModel
      .findById(req.params.id)
      .then(question => {
        let downindex = 0
        let downvoter = false

        question.downvotes.forEach((e, index) => {
          if (e == req.body.userId) {
            downindex = index
            downvoter = true
          }
        })

        question.upvotes.forEach((e) => {
          if (e == req.body.userId) {
            throw new Error(`You are not allowed to up vote anymore`)
          }
        })

        if (downvoter == true) {
          question.downvotes.splice(downindex, 1)
        } else {
          question.upvotes.push(req.body.userId)
        }

        return questionModel
          .findByIdAndUpdate(req.params.id, {
            upvotes: question.upvotes,
            downvotes: question.downvotes
          }, { new: true })
          .populate('userId')
      })
      .then(updatedQuestion => {
        res.status(200).json(updatedQuestion)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static downVote(req, res) {
    questionModel
      .findById(req.params.id)
      .then(question => {
        let upindex = 0
        let upvoter = false

        question.upvotes.forEach((e, index) => {
          if (e == req.body.userId) {
            upindex = index
            upvoter = true
          }
        })

        question.downvotes.forEach((e) => {
          if (e == req.body.userId) {
            throw new Error(`You are not allowed to down vote anymore`)
          }
        })

        if (upvoter == true) {
          question.upvotes.splice(upindex, 1)
        } else {
          question.downvotes.push(req.body.userId)
        }

        return questionModel
          .findByIdAndUpdate(req.params.id, {
            upvotes: question.upvotes,
            downvotes: question.downvotes
          }, { new: true })
          .populate('userId')
      })
      .then(updatedQuestion => {
        res.status(200).json(updatedQuestion)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }
}



module.exports = Controller