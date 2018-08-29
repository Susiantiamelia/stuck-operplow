console.log('gmail is active')

function gmailSent (user) {
  console.log(user);
  
  const send = require('gmail-send')({
    user: 'ameliasusianti@gmail.com',
    pass: 'alwaysforever',
    to:   user.email,
    // bcc: 'some-user@mail.com',            // almost any option of `nodemailer` will be passed to it
    subject: user.subject,
    text:    user.text
  })
  send()
}
module.exports = {
  gmailSent
}