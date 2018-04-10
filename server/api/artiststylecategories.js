const router = require('express').Router()
const {ArtistStyleCategory} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  ArtistStyleCategory.findAll()
    .then(users => res.json(users))
    .catch(next)
})
