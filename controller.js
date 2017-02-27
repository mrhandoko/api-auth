var Model = require('./models')
var jwt = require('jsonwebtoken')
var crypto = require('crypto')

module.exports = {
  getAllUser: function (req, res, next) {
    Model.User.findAll().then(function (users) {
      res.send(users)
    })
  },
  getUser: function (req, res, next) {
    Model.User.findById(req.params.id).then(function (user) {
      res.send(user)
    })
  },
  createNewUser: function (req, res, next) {
    Model.User.create({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      RoleId: req.body.role
    }).then(function (user) {
      res.send(user)
    })
  },
  deleteUser: function (req, res, next) {
    Model.User.destroy({where: {id: req.params.id}}).then(function (user) {
      res.send('User deleted')
    })
  },
  updateUser: function (req, res, next) {
    Model.User.update({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      RoleId: req.body.role
    }, {where: {id: req.params.id}}).then(function () {
      Model.User.findById(req.params.id).then(function (user) {
        res.send(user)
      })
    })
  },
  loginUser: function (req, res, next) {
    Model.User.find({where: {username: req.body.username}}).then(function (user) {
      // let token = jwt.sign({username: user.username}, 'J4ng4n1nt1p', {expiresIn: '1d'})
      // res.send(`Selamat Datang ${user.fullname} token:${token}`)
      if (user) {
        const hash = crypto.createHmac('sha512', user.salt).update(req.body.password).digest('hex')
        if (hash == user.password) {
          let token = jwt.sign({username: user.username}, 'J4ng4n1nt1p', {expiresIn: '1h'})
          res.send(`Selamat Datang ${user.fullname} token:${token}`)
        } else {
          res.send('wrong password. try again.')
        }
      } else {
        res.send('invalid username')
      }
    })
  }
}
