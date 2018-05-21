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
  description: {
    type: Sequelize.TEXT
  },
  year: {
    type: Sequelize.STRING
  },
  height: {
    type: Sequelize.INTEGER
  },
  length: {
    type: Sequelize.INTEGER
  },
  width: {
    type: Sequelize.INTEGER
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
  saleType: {
    type:   Sequelize.ENUM,
    defaultValue: null,
    values: [ 'Online Order', 'Contact For Sale', 'Other']
  },
  isSold: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  inventory: {
    type: Sequelize.INTEGER
  },
  inventoryId: {
    type: Sequelize.STRING
  },
})

module.exports = Product
