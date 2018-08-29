const CronJob = require('cron').CronJob;
const UserModel = require('./model/user.js')
const { gmailSent } = require('./mail.js')


let crontest = function(){
  new CronJob('0 0 21 * * *', function (){
    UserModel.find({})
    .then(user => {
      for(let i = 0; i < user.length; i++){
        let usermail = {
          email: user[i].email,
          subject: 'Stuck Overplow',
          text: `Hi did you allready ask your question in our app today ?`
        }
        gmailSent(usermail)
      }
    })
    .catch(err => {
      console.log(err);
      
    })
  }, null, true, 'Asia/Jakarta')
}

module.exports = crontest