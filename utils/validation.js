const isInLength = (min, max, spacesAllowed, target) => {
  if (!spacesAllowed) {
    if (target.length !== target.replace(/\s+/g, '').length)
      return false
  }
  return target.length >= min && target.length <= max
}

module.exports = {
  isInLength
}