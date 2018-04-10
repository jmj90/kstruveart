const router = require('express').Router()
const {Artist} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Artist.findAll()
    .then(users => res.json(users))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Artist.findOrCreate({
    where: req.body
  })
  .then(product => res.json(product).status(200))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  let id = req.params.id
  Artist.findOne({
    where: { id },
  })
  .then(product => {
    product.update(req.body)
  })
  .then(() => res.json(req.body).status(200))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Artist.destroy({
    where: { id }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})
