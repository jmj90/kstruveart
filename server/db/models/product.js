const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/images/defaultimage.png'
  },
  photoSet: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: []
  },
  description: {
    type: Sequelize.TEXT
  },
  year: {
    type: Sequelize.STRING
  },
  height: {
    type: Sequelize.DECIMAL
  },
  length: {
    type: Sequelize.DECIMAL
  },
  width: {
    type: Sequelize.DECIMAL
  },
  price: {
    type: Sequelize.INTEGER
  },
  producttype: {
    type: Sequelize.STRING
  },
  media: {
    type: Sequelize.STRING
  },
  edition: {
    type: Sequelize.STRING
  },
  photoCredit: {
    type: Sequelize.STRING
  },
  series: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isSold: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  inventoryId: {
    type: Sequelize.STRING
  },
})

module.exports = Product
