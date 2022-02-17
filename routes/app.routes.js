const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => {
  return res.json({
    data: {
      version: '0.0.1',
      service: 'Pimex Calendar Service',
      name: 'pimex-calendar',
      status: 'ok'
    },
    statusCode: 200
  })
})

module.exports = router
