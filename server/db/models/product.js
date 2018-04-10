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
  price: {
    type: Sequelize.INTEGER
  },
  producttype: {
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
  }
})

module.exports = Product
