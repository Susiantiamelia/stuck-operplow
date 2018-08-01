var express = require('express');
var router = express.Router();
const Answer = require('../controller/answer.js')

router.post('/create/:id', Answer.create) //id question

router.put('/edit/:id', Answer.update) // id answer

router.get('/:id',Answer.read) // id question

module.exports = router
