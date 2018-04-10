const Sequelize = require('sequelize')
const db = require('../db')

const Artwork = db.define('artwork', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER
  },
  photo: {
    type: Sequelize.STRING
  }
})

module.exports = Artwork
