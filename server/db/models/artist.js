const Sequelize = require('sequelize')
const db = require('../db')

const Artist = db.define('artist', {
  firstname: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  biography: {
    type: Sequelize.TEXT
  },
  photo: {
    type: Sequelize.TEXT,
    defaultValue: '/images/defaultimage.png'
  },
  stylePhoto: {
    type: Sequelize.TEXT,
    defaultValue: '/images/defaultimage.png'
  },
}, {
  getterMethods: {
    fullname: function(){
        return this.firstname + ' ' + this.lastname
    }
  }
})

module.exports = Artist
