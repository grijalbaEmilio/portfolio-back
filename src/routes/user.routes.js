const express = require('express')
const {
  postOneUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  updateOneUser,
  loginUserAccesToken,
} = require('../controllers/users.controller')

const app = express()

app.post('/postUser', async (req, res) => {
  try {
    const user = await postOneUser(req.body)

    res.status(200).json({
      message: 'usuario posteado con éxito!',
      user,
    })
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message })
      return
    }
    res.status(400).json({ message: 'error!' })
  }
})

app.post('/loginUser', async (req, res) => {
  const { password, email } = req.body

  try {
    const accesToken = await loginUserAccesToken({ email, password })
    res.json({ message: 'login correct.', accesToken })
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message })
      return
    }
    res.status(400).json({ message: 'error.' })
  }
})

app.get('/getUsers', async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json({ message: 'successful serch.', users })
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message })
      return
    }
    res.status(400).json({ message: 'Error' })
  }
})

app.get('/getOneUser/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await getOneUser(id)
    res.json({ message: 'successful search.', user })
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message })
      return
    }
    res.status(400).json({ message: 'error.' })
  }
})

app.delete('/deleteOneUser/:id', async (req, res) => {
  try {
    const { id } = req.params
    const userDelete = await deleteOneUser(id)
    res.status(200).json({ message: 'succesful delete.', user: userDelete })
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message })
      return
    }
    res.status(400).json({ message: 'error.' })
  }
})

app.put('/updateOneUser/:id', async (req, res) => {
  const { id } = req.params

  try {
    const updateUser = await updateOneUser(id, req.body)
    res.json({ message: 'successful update.', user: updateUser })
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message })
      return
    }
    res.status(400).json({ message: 'error' })
  }
})

module.exports = app
