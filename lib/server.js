var map = []

var Server = function (conn) {
    this.conn = conn
}

Server.prototype.handleNewPlayer = function (socket) {
    console.log('user connected')
    var id = map.length
    socket.broadcast.emit('newPlayer', id)

    socket.on('disconnect', function () {
        console.log('user disconnected', id)
        map.splice(id, 1)
        socket.broadcast.emit('removePlayer', id)
    })

    socket.on('lookWhatIdid', function (actions) {
        actions.forEach(function (ele, i, arr) {
            map[id].pos.x += ele.x
            map[id].pos.y += ele.y
        })
    })

    var startPosition = {x: 10, y: 10}
    for (var i in map) {
        socket.emit('newPlayer', i)
    }
    map.push({soc: socket, pos: startPosition})
    var pos_only = map.map(function (ele) { return ele.pos })
    socket.emit('initState', {'id': id, 'positions': pos_only})
}

Server.prototype.updatePlayerState = function () {
    var pos_only = map.map(function (ele) { return ele.pos })
    this.conn.emit('newState', pos_only)
    //console.log(pos_only)

    setTimeout(this.updatePlayerState.bind(this), 500)
}

module.exports.Server = Server
