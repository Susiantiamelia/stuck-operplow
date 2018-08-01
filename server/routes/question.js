var express = require('express');
var router = express.Router();
const Question= require('../controller/question.js')

router.post('/post', Question.create)

router.put('/edit/:id',Question.update)

router.get('/user-question', Question.readQuestionUser)

router.get('/find-question', Question.findQuestionByTitle)

router.get('/', Question.allQuestion)

router.delete('/delete-question/:id', Question.delete)

module.exports = router