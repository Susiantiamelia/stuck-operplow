const QuestionModel = require('../model/question.js')
const UserModel = require('../model/user.js')
const AnswerModel = require('../model/answer.js')
const jwt = require("jsonwebtoken");
require('dotenv').config()
const key = process.env.SECRET_KEY;

class Answers{
    static create(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        AnswerModel.create({
            content: req.body.content,
            votesUp: [],
            votesDown: [],
            questionId: req.params.id,
            userId: user.id
        })
        .then(answer => {
            QuestionModel.update({_id: req.params.id},{$push: {answerId: answer._id}})
            .then(result => {
                res.status(200).json({msg: 'Your answer has been post', answer: answer})
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static update(req,res){

        AnswerModel.update({_id: req.params.id},{
            content: req.body.content
        })
        .then(result => {
            res.status(200).json('Answer successfully updated')
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static read(req,res){

        AnswerModel.find({questionId: req.params.id})
        .then(answer => {
            res.status(200).json(answer)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }
}

module.exports = Answers