const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
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
  userId: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: [true, 'UserId is required']
  }
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question