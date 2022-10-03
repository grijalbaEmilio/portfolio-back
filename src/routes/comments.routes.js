const express = require('express')

const app = express.Router()

const {
  postComment,
  getAllComments,
  getOneComment,
  deleteComment,
  updateComment,
} = require('../controllers/comments.controller')

app.post('/postComment', async (req, res) => {
  try {
    const comment = await postComment(req.body)
    res.json({ message: 'successful create comment', comment })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.get('/getComments', async (req, res) => {
  try {
    const comments = await getAllComments()
    res.json({ message: 'successful search', comments })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.get('/getOneComment/:id', async (req, res) => {
  try {
    const commetn = await getOneComment(req.params.id)
    res.json({ message: 'successful search', commetn })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.delete('/deleteOneComment/:id', async (req, res) => {
  try {
    const comment = await deleteComment(req.params.id)
    res.json({ message: 'comment deleted', comment })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.put('/updateComment/:id', async (req, res) => {
  try {
    const comment = await updateComment(req.params.id, req.body)
    res.json({ message: 'comment update', comment })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = app
