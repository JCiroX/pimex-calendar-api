const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { initializeApp } = require('firebase/app')
const morgan = require('morgan')
const serviceAccount = require('./keys/firebase-key.json')
const { normalizePort } = require('./utils/utils')

const swaggerUI = require('swagger-ui-express')
const { apiDocumentation } = require('./docs/apidocs')

initializeApp(
  {
    ...serviceAccount,
    storageBucket: 'pimex-calendar.appspot.com'
  },
  'firebase'
)

const port = normalizePort(process.env.PORT || 5000)
const app = express()

app.use(
  fileUpload({
    createParentPath: true
  })
)

app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(morgan('dev'))

app.set('port', port)

app.use('/', require('./routes/app.routes'))
app.use('/calendar', require('./routes/calendar.routes'))
app.use('/event', require('./routes/events.routes'))
app.use('/google', require('./routes/google.routes'))
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(apiDocumentation))

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
