const express = require('express')

const app = express.Router()

const {
  postComments,
  getComments,
  getOneComment,
  deleteComment,
  updateComment,
} = require('../controllers/comments.controller')

app.post('/postComment', postComments)
app.get('/getComments', getComments)
app.get('/getOneComment/:id', getOneComment)
app.delete('/deleteComment/:id', deleteComment)
app.put('/updateComment/:id', updateComment)

module.exports = app
