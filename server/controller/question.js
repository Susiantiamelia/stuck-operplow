const QuestionModel = require('../model/question.js')
const UserModel = require('../model/user.js')
const AnswerModel = require('../model/answer.js')
const jwt = require("jsonwebtoken");
require('dotenv').config()
const key = process.env.SECRET_KEY;

class Questions{
    static create(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)
        console.log(user);
        

        QuestionModel.create({
            title: req.body.title,
            content: req.body.content,
            votes: [],
            answerId: [],
            userId: user.id
        })
        .then(success => {
            UserModel.update({_id: user.id},{$push: {question_list: success._id}})
            .then(result => {
                res.status(200).json({msg: 'success add question', question: success})
            })
            .catch(err => {
                console.log(err);
                
                res.status(500).json(err.message)
            })
            
        })
        .catch(err => {
            res.status(500).json(err.message)
            console.log(err)
            
        })
    }

    static update(req,res){
        let question_id = req.params.id

        QuestionModel.update({_id: question_id},{
            title: req.body.title,
            content: req.body.content
        }).then(result => {
            res.status(200).json('sucessfully updated question')
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static delete(req,res){
        let question_id = req.params.id

        QuestionModel.deleteOne({_id: question_id})
        .then(success => {
            AnswerModel.deleteMany({questionId: question_id})
            .then(result => {
                res.status(200).json('successfully deleted question')

            })
            .catch(err => {
                res.status(500).json(err.message)
            })
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static readQuestionUser(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        QuestionModel.find({userId: user.id})
        .then(question => {
            res.status(200).json(question)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static getOne(req,res){
        QuestionModel.find({_id: req.params.id})
        .then( result => {
            res.status(200).json(result[0])
        })
        .catch(err => {
            res.status(500).json(err)
        })

    }

    static findQuestionByTitle(req,res){
        QuestionModel.find({title: {$in: [req.body.search]}})
        .then(question => {
            res.status(200).json(question)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static allQuestion(req,res){
        QuestionModel.find({})
        .then(question => {
            res.status(200).json(question)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static questionEdit(req,res){
        QuestionModel.updateOne({_id: req.params.id}, {
            title: req.body.title,
            content: req.body.content
        })
        .then(result => {
            res.status(200).json({msg: 'successfully updated question'})
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static votes(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

       QuestionModel.find({_id: req.params.id})
        .then(result => {
            if(result.length != 0){
                if(result[0].userId != user.id){
                   QuestionModel.update({_id: req.params.id}, {
                        $addToSet: {votes: user.id}
                    })
                    .then(result => {
                        console.log(result);
                        
                        res.status(200).json('success votes question')
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
                } else {
                    res.status(400).json(`sorry but you can't vote on your own question`)
                }
            } else {
                res.status(400).json(`sorry but we can't find the question`)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = Questions