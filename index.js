const express = require('express')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const coors = require('cors')

const app = express()
const routesInit = require('./src/routes')
require('dotenv').config()

const port = process.env.PORT || 3000
const url = process.env.PATH_MONGODB

app.listen(port, () => {
  console.log('listening the port ', port)
  mongoose
    .connect(url)
    .then(() => console.log('connection with mongo succes!'))
    .catch(() => console.log('connection no start!'))
})

app.use(express.json())
app.use(fileUpload())
app.use(coors())

express.static('/src/assets/img')
routesInit(app)
