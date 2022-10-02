const express = require('express')
const {
  postOneUser,
  getUsers,
  getOneUser,
  deleteUser,
  updateUser,
  loginUser,
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
app.post('/loginUser', loginUser)
app.get('/getUsers', getUsers)
app.get('/getOneUser/:id', getOneUser)
app.delete('/deleteOneUser/:id', deleteUser)
app.put('/updateOneUser/:id', updateUser)

module.exports = app
