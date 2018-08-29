var express = require('express');
var router = express.Router();
const Question= require('../controller/question.js')
var middle = require('../middleware/cek-user.js')


router.post('/post', middle, Question.create)

router.put('/votes/:id', middle, Question.votes)

router.put('/edit/:id', middle, Question.update)

router.get('/user-question',Question.readQuestionUser)

router.get('/find-question', Question.findQuestionByTitle)

router.get('/', Question.allQuestion)

router.get('/:id', Question.getOne)

router.delete('/delete-question/:id', middle, Question.delete)

module.exports = router