const express = require('express')
const commentsRoutes = require('./comments.routes')
const proyectsRoutes = require('./proyects.routes')
const usersRoutes = require('./user.routes')
require('dotenv').config()

const Router = express.Router()

const { API_VERSION } = process.env

function routes(app) {
  app.use(`/api/${API_VERSION}`, Router)
  Router.use('/comments', commentsRoutes)
  Router.use('/proyects', proyectsRoutes)
  Router.use('/users', usersRoutes)
}

module.exports = routes
