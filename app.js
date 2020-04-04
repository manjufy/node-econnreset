/**
 * Reference: https://github.com/nodejs/node/issues/27916
 * $> cd node-econnreset
 * $> node app.js
 */
const http = require('http')

const server = http.createServer(function (req, res) {
  req.on('data', () => {})
  setTimeout(() => {
    // Prematurely ending the request. Usually due to a 5xx error.
    res.statusCode = 200
    res.end()
  }, 1000)
})

server.listen(0, function () {
  const req = http.request({
    port: this.address().port,
    method: 'POST',
    path: '/'
  })
  req.on('response', res => {
    console.log("!", res.statusCode)
    clearInterval(interval)
  })
  const interval = setInterval(() => {
    req.write(Buffer.alloc(32))
  }, 1000)
})