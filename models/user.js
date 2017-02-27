'use strict'
const crypto = require('crypto')

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        isUnique: function (value, next) {
          User.find({
            where: {
              email: value
            }, attributes: ['id']
          }).done(function (user) {
            if (user) {
              return next(`Email address already in use`)
            }
            next()
          })
        }
      }
    },
    password: DataTypes.STRING,
    RoleId: DataTypes.INTEGER,
    salt: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        User.belongsTo(models.Role)
      }
    },
    hooks: {
      beforeCreate: function (value, option) {
        let unique = 'abcdefghijklmnopqrsstuvwxyz0123456789'
        let salt = ''

        for (let i = 0; i < unique.length; i++) {
          salt += unique[Math.floor(Math.random() * unique.length)]
        }
        value.salt = salt

        const hash = crypto.createHmac('sha512', salt).update(value.password).digest('hex')
        value.password = hash
      }
    }
  })
  return User
}
