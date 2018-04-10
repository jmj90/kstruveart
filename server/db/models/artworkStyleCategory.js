const Sequelize = require('sequelize')
const db = require('../db')

const ArtworkStyleCategory = db.define('artworkStyleCategory', {
  title: {
    type: Sequelize.STRING
  }
})

module.exports = ArtworkStyleCategory
