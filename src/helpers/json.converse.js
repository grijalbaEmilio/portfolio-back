function converseArray(arrayString) {
  try {
    return JSON.parse(arrayString)
  } catch {
    return null
  }
}

module.exports = { converseArray }
