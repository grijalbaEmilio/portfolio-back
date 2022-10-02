const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  authorUrl: {
    type: String,
    require: true,
  },
  parentUrl: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  postDate: {
    type: Date,
    require: true,
  },
})

module.exports = mongoose.model('comments', Schema)
