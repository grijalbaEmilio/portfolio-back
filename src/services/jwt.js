// eslint-disable-next-line import/no-unresolved
const jwt = require('jwt-simple')

const secretKey = 'w4iojldf_55'

function generateAccesToken(user) {
  const { name, id, email, role } = user

  return jwt.encode({ name, id, email, role }, secretKey)
}

module.exports = { generateAccesToken }
