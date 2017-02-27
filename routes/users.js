var express = require('express')
var router = express.Router()
var Controller = require('../controller')
var authHelper = require('../helper/auth')

/* GET users listing. */
router.get('/', authHelper.isAdmin, Controller.getAllUser)

router.get('/:id', Controller.getUser)

router.post('/', authHelper.isAdmin, Controller.createNewUser)

router.delete('/:id', authHelper.isAdmin, Controller.deleteUser)

router.put('/:id', Controller.updateUser)

module.exports = router
