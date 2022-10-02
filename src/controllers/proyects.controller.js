const Schema = require('../models/proyects.mode')
const { saveImg, imgPath } = require('../helpers/image.torage')
const { converseArray } = require('../helpers/json.converse')

function postProyect(req, res) {
  const { title, tecnologies, description, demo, code } = req.body
  let img
  try {
    img = req.files.img
  } catch {
    res.status(500).json({ message: ' no complete data' })
    return
  }

  if (!img || !tecnologies || !title || !description || !demo || !code) {
    res.status(500).json({ message: ' no complete data' })
  } else {
    saveImg(img, res)

    const imgUrl = imgPath(img)
    const proyect = new Schema({
      imgUrl,
      tecnologies,
      description,
      title,
      demo,
      code,
    })

    proyect.tecnologies = converseArray(tecnologies)
    if (!proyect.tecnologies) {
      res.status(500).json({ message: 'server error' })
      return
    }

    proyect
      .save()
      .then(() => res.status(200).json({ message: 'save proyect.' }))
      .catch((error) => res.status(500).json({ message: error }))
  }
}

function getProyects(req, res) {
  Schema.find()
    .then((data) => res.json(data))
    .catch(() => res.status(500).json({ message: 'server error' }))
}

function removeOneProyect(req, res) {
  const { id } = req.params

  Schema.findByIdAndRemove({ _id: id }, null, (err, proyect) => {
    if (err) {
      res.status(400).json({ message: 'proyect not found' })
    } else if (!proyect) {
      res.status(400).json({ message: 'proyect not found' })
    } else {
      res.status(200).json({ message: 'delete success' })
    }
  })
}

function updateOneProyect(req, res) {
  const { id } = req.params
  const { body } = req
  const { tecnologies } = body
  let img
  try {
    img = req.files.img
  } catch {
    img = null
  }

  if (tecnologies) {
    body.tecnologies = converseArray(tecnologies)
  }
  if (img) {
    saveImg(img, res)
    body.imgUrl = imgPath(img)
  }
  Schema.findByIdAndUpdate({ _id: id }, body, null, (err, program) => {
    if (err) {
      res.status(400).json({ message: 'proyect not found' })
    } else if (!program) {
      res.status(400).json({ message: 'proyect not found' })
    } else {
      res.status(200).json({ message: 'update success' })
    }
  })
}

module.exports = {
  postProyect,
  getProyects,
  removeOneProyect,
  updateOneProyect,
}
