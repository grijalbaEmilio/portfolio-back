const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
  imgUrl: {
    type: String,
    require: true,
  },
  tecnologies: {
    type: Array,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  demo: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('projects', projectSchema)
