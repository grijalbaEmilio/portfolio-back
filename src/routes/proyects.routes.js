const express = require('express')

const app = express()
const {
  postProyect,
  getProyects,
  removeOneProyect,
  updateOneProyect,
} = require('../controllers/proyects.controller')

app.use('/img', express.static('src/assets/img'))

app.post('/postProyect', postProyect)
app.get('/getProyects', getProyects)
app.delete('/removeOneProyect/:id', removeOneProyect)
app.put('/updateOneProyect/:id', updateOneProyect)

module.exports = app
