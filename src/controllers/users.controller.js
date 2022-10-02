const bcrypt = require('bcryptjs')
const Schema = require('../models/users.model')
const {
  validEmail,
  validName,
  validAndHashedPassword,
} = require('../helpers/validations')
const { generateAccesToken } = require('../services/jwt')

async function postOneUser(newUser) {
  const { name, email, password, repeatPassword } = newUser

  const userFinal = new Schema({
    name: validName(name),
    email: validEmail(email),
    password: await validAndHashedPassword(password, repeatPassword),
  })

  return userFinal
    .save()
    .then((usr) => usr)
    .catch((err) => {
      if (err.code === 11000) throw new Error('user already exists.')

      throw new Error(err)
    })
}

function loginUser(req, res) {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(500).json({ message: 'no complete data' })
  } else {
    Schema.findOne({ email }, null, null, (err, user) => {
      if (err) {
        res.status(500).json({ message: 'server error' })
      } else if (!user) {
        res.status(404).json({ message: 'user not found' })
      } else {
        bcrypt.compare(password, user.password, (error, correct) => {
          if (error) {
            res.status(500).json({ message: 'server error' })
          } else if (!correct) {
            res.status(400).json({ message: 'incorrect password' })
          } else {
            res.status(200).json({ accesToken: generateAccesToken(user) })
          }
        })
      }
    })
  }
}

function getUsers(req, res) {
  Schema.find()
    .then((data) => res.status(200).json({ users: data }))
    .catch(() => res.ststus(404).json({ message: 'no data' }))
}

async function getOneUser(req, res) {
  const { id } = req.params
  Schema.findById(id, null, null, (err, user) => {
    if (err) {
      res.json({ message: 'user Not found' })
    }
    res.json(user)
  })
}

// ! pending remove getUsersLocal

async function getUsersLocal() {
  const users = await Schema.find().then((data) => data)

  return users
}

function deleteUser(req, res) {
  const { id } = req.params
  Schema.findOneAndDelete({ _id: id }, null, (err, user) => {
    if (err) {
      res.status(500).json({ message: 'server error' })
    } else if (!user) {
      res.status(404).json({ message: 'user not found' })
    } else {
      res.status(200).json({ message: 'success delete' })
    }
  })
}

function updateUser(req, res) {
  const { id } = req.params
  const { body } = req
  Schema.findOneAndUpdate({ _id: id }, body, null, (err, user) => {
    if (err) {
      res.status(500).json({ message: 'server error' })
    } else if (!user) {
      res.status(404).json({ message: 'user not found' })
    } else {
      res.status(200).json({ message: 'success update' })
    }
  })
}

module.exports = {
  postOneUser,
  getUsers,
  getOneUser,
  deleteUser,
  updateUser,
  loginUser,
  getUsersLocal,
}
