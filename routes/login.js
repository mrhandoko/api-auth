var express = require('express')
var router = express.Router()
var Controller = require('../controller')

/* GET users listing. */
router.post('/', Controller.loginUser)

module.exports = router
