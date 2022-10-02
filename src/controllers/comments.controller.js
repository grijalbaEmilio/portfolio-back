const Schema = require('../models/comments.model')

function postComments(req, res) {
  const { authorId, parentId, content, likes } = req.body

  const { PORT, HOST, API_VERSION } = process.env

  let parentUrl = null

  if (parentId) {
    parentUrl = `${HOST}:${PORT}/api/${API_VERSION}/comments/getOneComment/${parentId}`
  }

  if (authorId && content) {
    const authorUrl = `${HOST}:${PORT}/api/${API_VERSION}/users/getOneUser/${authorId}`
    const postDate = new Date(Date.now())

    const comment = new Schema({
      authorUrl,
      parentUrl,
      content,
      likes,
      postDate,
    })
    comment
      .save()
      .then((data) => res.status(200).json({ message: data }))
      .catch(() => res.status(500).json({ message: 'no guardado' }))
  } else {
    res.status(400).json({ message: 'datos incompletos.' })
  }
}

async function getComments(req, res) {
  const comments = await Schema.find()
  if (!comments) {
    res.json({ message: 'comments not found' })
  }
  res.json(comments)
}

async function getOneComment(req, res) {
  const { id } = req.params
  Schema.findById(id, null, null, (err, comment) => {
    if (err) {
      res.json({ message: 'comment not found' })
    }
    res.json(comment)
  })
}

function deleteComment(req, res) {
  const { id } = req.params
  Schema.findByIdAndDelete({ _id: id }, null, (err, comment) => {
    if (err) {
      res.status(500).json({ message: 'server error' })
    } else if (!comment) {
      res.status(404).json({ message: 'comment not found' })
    } else {
      res.status(200).json({ message: 'success delete' })
    }
  })
}

function updateComment(req, res) {
  const { id } = req.params
  const { body } = req

  Schema.findByIdAndUpdate({ _id: id }, body, null, (err, comment) => {
    if (err) {
      res.status(500).json({ message: 'server error' })
    } else if (!comment) {
      res.status(404).json({ message: 'comment not found' })
    } else {
      res.status(200).json({ message: 'success update' })
    }
  })
}

module.exports = {
  postComments,
  getComments,
  getOneComment,
  deleteComment,
  updateComment,
}
