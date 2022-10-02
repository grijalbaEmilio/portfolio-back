const bcrypt = require('bcryptjs')

const validStrig = (data) => typeof data === 'string' || data instanceof String

const validEmail = (mail) => {
  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

  if (!validStrig(mail)) {
    throw new Error('the email must be type string.')
  }

  if (!emailRegex.test(mail)) {
    throw new Error('invalid email.')
  }

  return mail
}

const validName = (name) => {
  if (!validStrig(name)) {
    throw new Error('the name must be type strig.')
  }
  if (name.lenght < 5) {
    throw new Error('the name must have min 5 characters')
  }

  return name
}

const validAndHashedPassword = async (password, repeatPassword) => {
  if (!validStrig(password) || !validStrig(repeatPassword)) {
    throw new Error('the password must be type string')
  }
  if (password !== repeatPassword) {
    throw new Error('password and repeatPassword are not same')
  }
  if (password.length < 5) {
    throw new Error('password must be min 5 characters')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  return passwordHash
}

const validRole = (role) => {
  if (!validStrig(role)) {
    throw new Error('role must be string type.')
  }

  if (!(role === 'reviewer' || role === 'admin')) {
    throw new Error('role must be reviewer or admin')
  }

  return role
}

module.exports = { validEmail, validName, validAndHashedPassword, validRole }
