var Model = require('../models')
var jwt = require('jsonwebtoken')

module.exports = {
  auth: function (req, res, next) {
    let token = req.headers.authorization
    jwt.verify(token, 'J4ng4n1nt1p', function (err, decoded) {
      if (err) {
        res.send(err)
      } else {
        next()
      }
    })
  },
  isAdmin: function (req, res, next) {
    jwt.verify(req.headers.authorization, 'J4ng4n1nt1p', function (err, decoded) {
      if (err) {
        res.send(err)
      } else {
        let decode = jwt.decode(req.headers.authorization)
        Model.User.find({where: {username: decode.username}}).then(function (user) {
          // Model.Role.find({include: [Model.User]}).then(function (role) {
          if (user.RoleId === 1) {
            next()
          } else {
            res.send('This page is restricted. Only administrator allowed')
          }
        // })
        })
      }
    })
  }
}
