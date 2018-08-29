var express = require('express');
var router = express.Router();
const Controller = require('../controller/users.js')
var middle = require('../middleware/cek-user.js')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', middle, Controller.profile)

router.post('/loginfb', Controller.loginfb)

router.post('/register', Controller.register)

router.post('/login', Controller.login)

router.put('/edit-profile',middle, Controller.update)

router.delete('/delete', middle, Controller.delete)

module.exports = router;
