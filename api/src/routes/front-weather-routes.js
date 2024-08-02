module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/front/weather-controller.js')

  router.post('/', controller.create)

  app.use('/api/front/weather/routes', router)
}
