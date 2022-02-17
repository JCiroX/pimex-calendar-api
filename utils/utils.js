const getRangeHours = (hours, day) => {
  const from = new Date(hours.from)
  const to = new Date(hours.to)

  const [hourF, minF, secF] = [
    from.getHours(),
    from.getMinutes(),
    from.getSeconds()
  ]
  const [hourT, minT, secT] = [to.getHours(), to.getMinutes(), to.getSeconds()]

  const timeMin = new Date(day.year, day.month - 1, day.day, hourF, minF, secF)
  const timeMax = new Date(day.year, day.month - 1, day.day, hourT, minT, secT)

  return { timeMin, timeMax }
}

const normalizePort = val => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

module.exports = {
  getRangeHours,
  normalizePort
}
