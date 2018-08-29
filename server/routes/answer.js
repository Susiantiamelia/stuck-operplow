var express = require('express');
var router = express.Router();
const Answer = require('../controller/answer.js')
var middle = require('../middleware/cek-user.js')


router.post('/create/:id', middle, Answer.create) //id question

router.put('/upvote/:id', middle, Answer.upVote) // id answer

router.put('/downvote/:id', middle, Answer.downVote) // id answer

router.put('/edit/:id', middle, Answer.update) // id answer

router.get('/:id',Answer.read) // id question

module.exports = router
