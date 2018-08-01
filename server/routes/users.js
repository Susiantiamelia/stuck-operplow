var express = require('express');
var router = express.Router();
const Controller = require('../controller/users.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', Controller.profile)

router.post('/loginfb', Controller.loginfb)

router.post('/register', Controller.register)

router.post('/login', Controller.login)

router.put('/edit-profile',Controller.update)

router.delete('/delete', Controller.delete)

module.exports = router;
