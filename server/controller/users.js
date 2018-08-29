const Model = require("../model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios")
const { gmailSent } = require('../mail.js')
require('dotenv').config()
const key = process.env.SECRET_KEY;

var salt = bcrypt.genSaltSync(8);

class Users {

    static loginfb(req,res){
        
        let token = req.body.fbToken
         let url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
        axios.get(url)
        .then(result => {
            console.log('result',result.data);
            Model.findOne({email: result.data.email})
            .then( found => {
                if(!found){
                    Model.create({
                        name: result.data.name,
                        email: result.data.email,
                        username: result.data.split(" ")[0],
                        password: result.data.id,
                        question_list: []
                    })
                    .then(success => {
                        let token = jwt.sign({id: success._id, name: success.name, email: success.email}, key)
                        res.status(200).json({
                            message: "login successfully",
                            token: token, 
                            id: success._id
                          })
                    })
                    .catch(err => {
                        res.status(400).json(err.message)
                    })
                } else {
                    let token = jwt.sign({id: found._id, name: found.name, email: found.email}, key)
                        res.status(200).json({
                            message: "login successfully",
                            token: token, 
                            id: found._id
                          })
                }
            })
            .catch(err => {
                console.log(err);
                
            })
        })
        .catch(err => {
            console.log(err.message);
            
        })
    }
    static register(req,res){        
            let password = bcrypt.hashSync(req.body.password, salt);
            Model.create({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: password,
                question_list: []
            })
            .then(user => {
                console.log('err');
                let usermail = {
                    email: user.email,
                    subject: 'Registration',
                    text: `Congratulation you're successfully registred in Stuck Overplow`
                }
                gmailSent(usermail)
                res.status(200).json({msg: 'Registration success', user: user})
            })
            .catch(err => {
                console.log(err);
                
                res.status(500).json(err.message)
                
                
            })
        
    }

    static login(req,res){
        console.log(req.body)
        Model.find({$or: [{email: req.body.uname_email}, {username: req.body.uname_email}]})
        .then(user => {
            if(user.length !=0){
                let checkPass = bcrypt.compareSync(req.body.password, user[0].password);
                if(checkPass){
                    //untuk sementara token taruh di headers, setelah ngerjain client ditaruh di localstorage
                    let token = jwt.sign({ id: user[0]._id, name: user[0].name , email: user[0].email}, key);
                    res.status(200).json({msg: `Happy to see you again ${user[0].full_name}`, token: token, id: user[0]._id})
                } else {
                    res.status(400).json({error: 'Wrong password'})
                }
            } else {
                res.status(400).json({error: 'Your email/username is wrong'})
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static profile(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        Model.find({_id: user.id})
        .then(userData => {
            res.status(200).json({user: userData})
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static update(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        Model.updateOne({_id: user.id},{
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static delete(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        Model.deleteOne({_id: user.id})
        .then(result => {
            res.status(200).json("Account deleted")
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    
}

module.exports = Users