const bcrypt = require('bcryptjs')
const { saveImg, imgPath } = require('./image.torage')

const validStrig = (data) => typeof data === 'string' || data instanceof String

const validNumber = (data) => typeof data === 'number'

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

// projects validations

const validUrl = (url) => {
  // eslint-disable-next-line operator-linebreak
  const expresionRegex =
    // eslint-disable-next-line no-useless-escape
    /^(ht|f)tps?:\/\/\w+([\.\-\w]+)?\.[a-z]{2,10}(:\d{2,5})?(\/.*)?$/

  if (!validStrig(url) || !expresionRegex.test(url)) {
    throw new Error('URL no valid.')
  }

  return url
}

const validTitle = (title) => {
  if (!validStrig(title)) {
    throw new Error('title no valid')
  }

  return title
}

const validDescription = (description) => {
  if (!validStrig(description)) {
    throw new Error('description no valid')
  }

  return description
}

const validTecnologiesConverseArray = (tecnologies) => {
  try {
    const tecnologiesArray = new Array(...JSON.parse(tecnologies))
    return tecnologiesArray
  } catch (err) {
    throw new Error(
      'tecnologies must be string but content array, example "["tec1", "tec2"]"'
    )
  }
}

const validImgGenereUrlImg = (imgFile) => {
  const expresionRegex = /.jpg|.png|.gif|.tiff|.psd|.bmp|.jpeg/
  if (!expresionRegex.test(imgFile.name)) {
    throw new Error('img no valid.')
  }

  saveImg(imgFile)
  console.log(imgPath(imgFile))
  return imgPath(imgFile)
}

// comments validatos

const validContent = (content) => {
  if (!validStrig(content)) {
    throw new Error('content no valid')
  }

  return content
}

const validLikes = (likes) => {
  if (!validNumber(likes)) {
    throw new Error('likes must be number')
  }

  if (likes < 0) {
    throw new Error('number must be positive')
  }
  return likes
}

module.exports = {
  validEmail,
  validName,
  validAndHashedPassword,
  validRole,
  validUrl,
  validTitle,
  validDescription,
  validTecnologiesConverseArray,
  validImgGenereUrlImg,
  validContent,
  validLikes,
}
