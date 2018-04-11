const User = require('./user')
const Artist = require('./artist')
const Artwork = require('./artwork')
const ArtistStyleCategory = require('./artistStyleCategory')
const Product = require('./product')

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Artwork.belongsTo(Artist)
Product.belongsTo(Artist)

Artist.hasMany(Artwork)
Artist.hasMany(Product)


ArtistStyleCategory.hasMany(Artist)

module.exports = {
  User,
  Artwork,
  Artist,
  Product,
  ArtistStyleCategory
}
