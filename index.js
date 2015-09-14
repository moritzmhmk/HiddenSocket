var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var Server = require('./lib/server.js').Server
var server = new Server(io)
server.updatePlayerState.apply(server)

app.use(express.static(__dirname + '/static'))

io.on('connection', server.handleNewPlayer)

http.listen(3000, function () {
  console.log('listening on *:3000')
})
