const Model = require("../model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const key = process.env.SECRET_KEY;

var salt = bcrypt.genSaltSync(8);

class Users {
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
                res.status(200).json({msg: 'Registration success', user: user})
            })
            .catch(err => {
                
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
                    let token = jwt.sign({ id: user[0]._id, fullname: user[0].full_name , email: user[0].email, todo_list: user[0].todo_list}, key);
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

    static loginfb(req,res){
        console.log('hereeee')
        let emailUser = req.body.email;
        let pass = req.body.password;
            User.findOne({email : emailUser})
            .then(data => {
                console.log(data)
                if(data === null){
                    console.log('gak ada nih', response.name.split(' ')[0])
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(`${response.name.split(' ')[0]}7`, salt);
                    console.log(hash)
                    User.create({
                        name: req.body.name,
                        email: req.body.email,
                        username: req.body.name.split(' ')[0],
                        password: hash
                    })
                    .then(result => {
                        console.log('udah nih')
                        let token = jwt.sign({id: result._id, name: result.name, email: result.email, fbid: result.fbid}, process.env.SECRET_KEY)
                        res.status(200).json({
                            message: "login successfully",
                            token
                          })
                    }).catch(err => {
                        res.status(400).json(err.message)
                    })
                } else {
                    console.log('disini')
                    let token = jwt.sign({id: data._id, name: data.name, email: data.email, fbid: data.fbid}, process.env.SECRET_KEY)
                    console.log(token)
                    res.status(200).json({
                        message: "login successfully",
                        token
                      })
                }
            })
            .catch(err => {
                res.status(400).json({
                  message: "wrong password/email "
                });
            });
            
            
        
    }
}

module.exports = Users