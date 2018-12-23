const isInLength = (min, max, spacesAllowed, target) => {
  if (target === undefined || target === null) {
    throw new TypeError('parameter "target" is null or undefined');
  }
  if (!spacesAllowed) {
    if (target.length !== target.replace(/\s+/g, '').length)
      return false;
  }
  return target.length >= min && target.length <= max;
}

module.exports = {
  isInLength
}