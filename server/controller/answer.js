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
                console.log('error masuk quest');
                
                res.status(500).json(err.message)
            })
        })
        .catch(err => {
            console.log('error disini deh');
            
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

        AnswerModel.find({questionId: req.params.id}).populate('userId')
        .then(answer => {
            res.status(200).json(answer)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static upVote(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        AnswerModel.find({_id: req.params.id})
        .then(result => {

            if(result.length != 0){

                if(result[0].userId != user.id){
                    
                    AnswerModel.update({_id: req.params.id}, {
                        $addToSet: {votesUp: user.id},
                        $pull: {votesDown: user.id}
                    })
                    .then(result => {
                        res.status(200).json('success upvote')
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
                } else {
                    res.status(400).json(`sorry but you can't vote on your own answer`)
                }
            } else {
                res.status(400).json(`sorry but we can't find the answer`)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static downVote(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        AnswerModel.find({_id: req.params.id})
        .then(result => {
            if(result.length != 0){
                if(result[0].userId != user.id){
                    AnswerModel.update({_id: req.params.id}, {
                        $addToSet: {votesDown: user.id},
                        $pull: {votesUp: user.id}
                    })
                    .then(result => {
                        console.log(result);
                        
                        res.status(200).json('success down vote')
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
                } else {
                    res.status(400).json(`sorry but you can't vote on your own answer`)
                }
            } else {
                res.status(400).json(`sorry but we can't find the answer`)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = Answers