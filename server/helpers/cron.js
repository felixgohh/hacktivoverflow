const cron = require('node-cron')
const questionModel = require('../models/question')
const kue = require('kue')
const queue = kue.createQueue()
const mailer = require('./mailer')

module.exports = function schedule() {
  cron.schedule('* * * * Sunday', () => {
    questionModel
      .find({})
      .populate('userId')
      .then(response => {
        response.forEach(e => {
          let text = `
                        Hi, ${e.userId.first_name} ${e.userId.last_name}
                        Your question for "${e.title}" has been upvoted for ${e.upvotes.length} time(s) and downvoted for ${e.downvotes.length} time(s)
                        Have a nice Sunday..
                        `
          let email = e.userId.email
          queue.create('email', {
            email,
            text
          }).save()
        })
      })
      .catch(err => {
        console.log(err);
      })

    queue.process('email', function (job, done) {
      mailer(job.data.email, job.data.text)
      done()
    })
  })
}