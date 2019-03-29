const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  upvotes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  downvotes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  questionId: {
    type: Schema.Types.ObjectId, ref: 'Question',
    required: [true, 'QuestionId is required']
  },
  userId: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: [true, 'UserId is required']
  },
})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer