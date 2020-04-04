const http = require('http')

const server = http.createServer(function (req, res) {
//   res.end()
})

server.listen(0, function () {
  const req = http.request({
    port: this.address().port,
    method: 'POST',
    path: '/'
  })
  req.on('response', res => {
    req.write(Buffer.alloc(32))
  })
  req.write(Buffer.alloc(32))
})