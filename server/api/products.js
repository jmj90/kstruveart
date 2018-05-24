const router = require('express').Router()
const { Artist, Product } = require('../db/models')

module.exports = router

const adminGateway = (req, res, next) => {
  if (req.user.isAdmin) {
		next()
	} else {
		next('Sorry, This feature can be used by admins only.')
	}
}

router.get('/', (req, res, next) => {
  Product.findAll({
    include: [{
      model: Artist
    }]
  })
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Product.findAll({where: { id } })
  .then(product => res.json(product))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Product.create(req.body)
  .then(product => res.json(product).status(200))
  .catch(next)
})

router.put('/:id', adminGateway, (req, res, next) => {
  let id = req.params.id
  Product.findOne({
    where: { id },
  })
  .then(product => {
    product.update(req.body)
  })
  .then(() => res.json(req.body).status(200))
  .catch(next)
})

router.delete('/:id', adminGateway, (req, res, next) => {
  let id = req.params.id
  Product.destroy({
    where: { id }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})
