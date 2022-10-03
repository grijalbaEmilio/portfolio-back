require('dotenv').config()

function saveImg(img) {
  img.mv(`./src/assets/img/${img.name}`, (err) => {
    if (err) throw new Error('no save img.')
  })
}

function imgPath(img) {
  const { PORT, HOST, API_VERSION } = process.env
  return `${HOST}:${PORT}/api/${API_VERSION}/projects/img/${img.name}`
}

module.exports = { saveImg, imgPath }
