'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {})
    */
    let newArr = []
  // newArr.push({role_name: 'Admin', createdAt: new Date(), updatedAt: new Date()}, {role_name: 'Supervisor', createdAt: new Date(), updatedAt: new Date()}, {role_name: 'Employeer', createdAt: new Date(), updatedAt: new Date()})
  //
  // return queryInterface.bulkInsert('Roles', newArr)
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {})
    */
  }
}
