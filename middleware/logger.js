const logger = (req, res, next) => {
  const newTime = new Date()
  const timestamp = newTime.toLocaleString()
  console.log(`[${timestamp}]: ${req.method} called to ${req.url}`)
  console.log('\n --- Start Body ---\n', req.body, '\n --- End Body --- \n')
  next()
}

module.exports = logger