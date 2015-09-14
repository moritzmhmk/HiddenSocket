var map = []

var Server = function (conn) {
    this.conn = conn
}

Server.prototype.handleNewPlayer = function (socket) {
    console.log('user connected')
    var id = map.length
    socket.broadcast.emit('newPlayer', id)

    socket.on('disconnect', function () {
        console.log('user disconnected')
    })

    socket.on('lookWhatIdid', function (actions) {
        for (var a in actions) {
            var act = actions[a]

            map[id].pos.x += act.x
            map[id].pos.y += act.y
        }
    })

    var startPosition = {x: 10, y: 10}
    for (var i in map) {
        socket.emit('newPlayer', i)
    }
    map.push({soc: socket, pos: startPosition})
    var pos_only = []
    for (var foo in map) { // *vomit*
        pos_only.push(map[foo].pos)
    }
    socket.emit('initState', {'id': id, 'positions': pos_only})
}

Server.prototype.updatePlayerState = function () {
    var tmp_map = map.slice(0)

    var pos_only = []
    for (var foo in tmp_map) { // *vomit*
        pos_only.push(tmp_map[foo].pos)
    }

    this.conn.emit('newState', pos_only)
    console.log(pos_only)

    setTimeout(this.updatePlayerState.bind(this), 500)
}

module.exports.Server = Server
