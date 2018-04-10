const router = require('express').Router()
const { Artwork, Artist } = require('../db/models')
module.exports = router

const adminGateway = (req, res, next) => {
  if (req.user.isAdmin) {
		next()
	} else {
		next('Sorry, This feature can be used by admins only.')
	}
}

router.get('/', (req, res, next) => {
  Artwork.findAll()
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Artwork.findAll({
    where: { id },
    include: [{
      model: Artist
    }]
  })
  .then(product => res.json(product))
  .catch(next)
})

router.post('/', adminGateway, (req, res, next) => {
  Artwork.findOrCreate({
    where: {
      title: req.body.title,
      year: req.body.year,
      description: req.body.description,
      price: req.body.price,
      photo: req.body.photo && req.body.photo
    }
    })
    .catch(next)
})

// router.put('/:id', adminGateway, (req, res, next) => {
//   let id = req.params.id
//   Artwork.findOne({
//     where: { id },
//     include: [{
//       model: Artist
//     }]
//   })
//   .then(product => {
//     let productCategory = product.categories[0].productCategory
//     let catId = product.categories[0].dataValues.id
//     if (req.body.categories){
//       console.log('found category on body')
//       Category.findOne({
//         where: {
//           id: catId
//         }
//       })
//       .then(category => {
//         productCategory.destroy({
//           where: {
//             productId: product.id,
//             categoryId: category.dataValues.id
//           }
//         })
//         console.log('after destroy')
//       })
//       Category.findOne({
//         where: {
//           categoryName: req.body.categories[0].categoryName
//         }
//       })
//       .then(category => {
//         product.addCategory([category])
//       })
//       console.log('after add')
//     }
//     product.update(req.body)
//   })
//   .then(() => res.json(req.body).status(200))
//   .catch(next)
// })

router.delete('/:id', adminGateway, (req, res, next) => {
  let id = req.params.id
  Artwork.destroy({
    where: { id }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})
