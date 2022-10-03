const Schema = require('../models/comments.model')
const { getOneUser } = require('./users.controller')
const { validContent, validLikes } = require('../helpers/validations')

require('dotenv').config()

async function getOneComment(id) {
  const commetn = await Schema.findById(id)

  if (!commetn) {
    throw new Error('comment not found')
  }

  return commetn
}

async function postComment(newComment) {
  const { authorId, parentId, content } = newComment
  const { PORT, HOST, API_VERSION } = process.env

  let parentUrl

  await getOneUser(authorId)
  if (parentId) {
    await getOneComment(parentId)
    parentUrl = `${HOST}:${PORT}/api/${API_VERSION}/comments/getOneComment/${parentId}`
  }

  const commentSchema = new Schema({
    authorUrl: `${HOST}:${PORT}/api/${API_VERSION}/users/getOneUser/${authorId}`,
    parentUrl,
    content: validContent(content),
    postDate: new Date(Date.now()),
  })

  const commentSave = await commentSchema.save()

  return commentSave
}

async function getAllComments() {
  const comments = await Schema.find()
  if (!comments || comments.length === 0) {
    throw new Error('no comments')
  }

  return comments
}

async function deleteComment(id) {
  const commentDelted = await Schema.findByIdAndDelete(id)

  if (!commentDelted) {
    throw new Error('comment not exists')
  }

  return commentDelted
}

async function updateComment(id, commentModified) {
  const { content, likes } = commentModified

  let commetforUpdate = {}
  if (content) {
    commetforUpdate = { ...commetforUpdate, content: validContent(content) }
  }

  if (likes) {
    commetforUpdate = { ...commetforUpdate, likes: validLikes(likes) }
  }

  const comment = await Schema.findByIdAndUpdate(id, commetforUpdate)

  return comment
}

module.exports = {
  postComment,
  getAllComments,
  getOneComment,
  deleteComment,
  updateComment,
}
