const express = require('express')

const app = express()
const {
  postProject,
  getProjects,
  removeOneProject,
  updateOneProject,
} = require('../controllers/projects.controller')

app.use('/img', express.static('src/assets/img'))

app.post('/postProject', async (req, res) => {
  try {
    const project = await postProject(req.body, req.files.img)
    res.json({ message: 'save project.', project })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.get('/getProjects', async (req, res) => {
  try {
    const projects = await getProjects()
    res.json({ message: 'successful search', projects })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.delete('/removeOneProject/:id', async (req, res) => {
  const { id } = req.params

  try {
    const projectDelete = await removeOneProject(id)

    res.json({ message: 'project deleted', project: projectDelete })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.put('/updateOneProject/:id', async (req, res) => {
  try {
    const proyect = await updateOneProject(req.params.id, {
      ...req.body,
      img: req.files?.img,
    })

    res.json({ message: 'updated project.', proyect })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = app
