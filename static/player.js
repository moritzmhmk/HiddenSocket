var Player = function (socket) {
  this.velocity = 0.01
  this.pos = {x: 0, y: 0}
  this.predicted_pos = {x: 0, y: 0}
  this.movement = {up: false, down: false, right: false, left: false}

  this.msPerTick = 15
  this.ticksPerServerUpdate = 5
  this.recentTicks = []

  this.socket = socket
  this.initEvents()

  this.lastUpdate = Date.now()
  this.update()

  this.serverUpdate()

  this.id = undefined
}

Player.prototype.initEvents = function () {
  var that = this

  this.socket.on('initState', function (info) {
    that.id = info.id
    that.pos = info.positions[that.id]
    that.predicted_pos = that.pos

    players = info.positions
  })

  this.socket.on('newState', function (positions) {
    that.pos = positions[that.id]
    var max_offset = 10
    if(Math.abs(that.pos.x - that.predicted_pos.x) > max_offset ||
       Math.abs(that.pos.y - that.predicted_pos.y) > max_offset) {
      that.predicted_pos = that.pos
    } else {
      that.predicted_pos.x -= (that.predicted_pos.x - that.pos.x) / 2
      that.predicted_pos.y -= (that.predicted_pos.y - that.pos.y) / 2
    }
    players = positions
  })

  this.socket.on('newPlayer', function (playerId) {
    console.log('new player', playerId)
    var div = document.createElement('div')
    div.id = 'player_' + playerId
    div.className += 'player'
    div.className += ' foreign'

    document.body.appendChild(div)
  })

  this.socket.on('removePlayer', function (playerId) {
    var pl = document.getElementById('player_' + playerId)
    pl.parentNode.removeChild(pl)
    if (playerId < that.id) that.id--
  })
}

Player.prototype.serverUpdate = function () {
  this.socket.emit('update', this.recentTicks)
  this.recentTicks = []
}

Player.prototype.update = function () {
  var dt = Date.now() - this.lastUpdate
  this.lastUpdate += dt

  this.move(dt)
  if(this.recentTicks.length >= 3) {
    this.serverUpdate()
  }
  setTimeout(this.update.bind(this), this.msPerTick)
}

Player.prototype.move = function (dt) {
  var tick = {
    id: 42, // TODO
    action: {}
  }

  var prediction = dt / this.msPerTick
  console.log(prediction + '(' + dt + '/' + this.msPerTick + ')')
  if (this.movement['up']) {
    tick.action['up'] = true
    this.predicted_pos.y -= prediction
  }
  if (this.movement['down']) {
    tick.action['down'] = true
    this.predicted_pos.y += prediction
  }
  if (this.movement['left']) {
    tick.action['left'] = true
    this.predicted_pos.x -= prediction
  }
  if (this.movement['right']) {
    tick.action['right'] = true
    this.predicted_pos.x += prediction
  }
  this.recentTicks.push(tick)
}

Player.prototype.updateMovement = function (e) {
  this.movement[e.detail.input] = e.detail.state
}
