require('dotenv').config()

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  }
});

function sendMail(to, text) {
  let mailOptions = {
    from: process.env.MAIL,
    to,
    subject: 'HacktivOverflow by Felix Goh :)',
    text
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);

    } else {
      console.log(info.response);

    }
  })
}

module.exports = sendMail