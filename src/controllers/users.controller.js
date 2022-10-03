const bcrypt = require('bcryptjs')
const Schema = require('../models/users.model')
const {
  validEmail,
  validName,
  validAndHashedPassword,
  validRole,
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

async function loginUserAccesToken({ email, password }) {
  validEmail(email)
  validAndHashedPassword(password, password)

  const user = await Schema.findOne({ email })

  if (!user) {
    throw new Error('user not found.')
  }

  const passwordCorrect = await bcrypt.compare(password, user.password)

  if (!passwordCorrect) {
    throw new Error('incorrect password.')
  }

  return generateAccesToken(user)
}

async function getAllUsers() {
  const usersFind = await Schema.find()

  if (!usersFind) {
    throw new Error('there are no users.')
  }

  return usersFind
}

async function getOneUser(id) {
  const user = await Schema.findById(id)

  if (!user) {
    throw new Error('user not found.')
  }

  return user
}

async function deleteOneUser(id) {
  const userDelete = await Schema.findOneAndDelete({ _id: id })
  if (!userDelete) {
    throw new Error('user not found')
  }
  return userDelete
}

async function updateOneUser(id, modifiedUser) {
  const { name, email, role } = modifiedUser
  let usertToUpdate = {}

  if (name) {
    validName(name)
    usertToUpdate = { ...usertToUpdate, name }
  }
  if (email) {
    validEmail(email)
    usertToUpdate = { ...usertToUpdate, email }
  }
  if (role) {
    validRole(role)
    usertToUpdate = { ...usertToUpdate, role }
  }
  const updateUser = await Schema.findOneAndUpdate({ _id: id }, usertToUpdate)

  if (!updateUser) {
    throw new Error('user not found.')
  }

  return updateUser
}

module.exports = {
  postOneUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  updateOneUser,
  loginUserAccesToken,
}
