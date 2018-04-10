const Sequelize = require('sequelize')
const db = require('../db')

const ArtistStyleCategory = db.define('artistStyleCategory', {
  title: {
    type: Sequelize.STRING
  }
})

module.exports = ArtistStyleCategory
