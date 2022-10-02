require('dotenv').config()

function saveImg(img, res) {
  img.mv(`./src/assets/img/${img.name}`, (err) => {
    if (err) res.status(500).json({ message: err })
  })
}

function imgPath(img) {
  const { PORT, HOST, API_VERSION } = process.env
  return `${HOST}:${PORT}/api/${API_VERSION}/proyects/img/${img.name}`
}

module.exports = { saveImg, imgPath }
