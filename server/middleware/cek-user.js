const User = require('../model/user.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const key = process.env.SECRET_KEY;

let auth = function (req,res, next){
  let token = req.headers.token
  let user = jwt.verify(token, key)

  try{
    User.find({email: user.email})
      .then(result => {
        if ( result.length !== 0 ) {
          if(result[0]._id == user.id){
            next()
          } else {
            res.status(401).json('sorry but this emailis not exist anymore')
          }
        } else {
          res.status(401).json(`sorry but you're not member of this website`)
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  } catch {
    res.status(401).json(`Are you kidding ?`)
  }
}

module.exports = auth