const Schema = require('../models/projects.mode')
const {
  validUrl,
  validTitle,
  validDescription,
  validTecnologiesConverseArray,
  validImgGenereUrlImg,
} = require('../helpers/validations')

async function postProject(newproject, img) {
  const { title, tecnologies, description, demo, code } = newproject

  const project = new Schema({
    imgUrl: validImgGenereUrlImg(img),
    tecnologies: validTecnologiesConverseArray(tecnologies),
    description: validDescription(description),
    title: validTitle(title),
    demo: validUrl(demo),
    code: validUrl(code),
  })

  const projectSaved = await project.save()

  return projectSaved
}

async function getProjects() {
  const projects = await Schema.find()
  if (!projects || projects.length === 0) {
    throw new Error('no projects')
  }

  return projects
}

async function removeOneProject(id) {
  const projectDelete = await Schema.findByIdAndDelete(id)

  if (!projectDelete) {
    throw new Error('project not found')
  }

  return projectDelete
}

async function updateOneProject(id, queryModified, img) {
  const { title, description, demo, code, tecnologies } = queryModified
  let projectModified = {}

  if (title) {
    projectModified = { ...projectModified, title: validTitle(title) }
  }
  if (description) {
    projectModified = {
      ...projectModified,
      description: validDescription(description),
    }
  }
  if (demo) {
    projectModified = { ...projectModified, demo: validUrl(demo) }
  }
  if (code) {
    projectModified = { ...projectModified, code: validUrl(code) }
  }
  if (tecnologies) {
    projectModified = {
      ...projectModified,
      tecnologies: validTecnologiesConverseArray(tecnologies),
    }
  }
  if (img) {
    projectModified = { ...projectModified, img: validImgGenereUrlImg(img) }
  }

  const project = await Schema.findByIdAndUpdate(id, projectModified)

  return project
}

module.exports = {
  postProject,
  getProjects,
  removeOneProject,
  updateOneProject,
}
