const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/artists', require('./artists'))
router.use('/artwork', require('./artwork'))
router.use('/products', require('./products'))
router.use('/authentication', require('./authentication'))
router.use('/artiststylecategories', require('./artiststylecategories'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
