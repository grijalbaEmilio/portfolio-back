const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: 'reviewer',
  },
})

module.exports = mongoose.model('users', Schema)
