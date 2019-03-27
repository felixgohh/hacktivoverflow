require('dotenv').config()

const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  cors = require('cors'),
  answerRoute = require('./routes/answerRoute'),
  userRoute = require('./routes/userRoute'),
  questionRoute = require('./routes/questionRoute'),
  schedule = require('./helpers/cron'),
  authenticated = require('./middlewares/jwt')

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0-s6ej4.gcp.mongodb.net/hacktivoverflow?retryWrites=true`, { useNewUrlParser: true })

schedule()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', userRoute)
app.use(authenticated.verify)
app.use('/questions', questionRoute)
app.use('/answers', answerRoute)

app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = app