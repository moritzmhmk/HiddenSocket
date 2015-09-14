var Player = function (socket) {
  this.velocity = 0.01
  this.pos = {x: 0, y: 0}
  this.movement = {up: false, down: false, right: false, left: false}

  this.socket = socket
  this.initEvents()

  this.lastUpdate = Date.now()
  this.update()

  this.recentActions = []
  this.serverUpdate()

  this.id = undefined
}

Player.prototype.initEvents = function () {
  var that = this

  this.socket.on('initState', function (info) {
    that.id = info.id
    that.pos = info.positions[that.id]

    players = info.positions
  })

  this.socket.on('newState', function (positions) {
    that.pos = positions[that.id]
    players = positions
  })

  this.socket.on('newPlayer', function (playerId) {
    console.log('new player!')
    var div = document.createElement('div')
    div.id = 'player_' + playerId
    div.className += 'player'
    div.className += ' foreign'

    document.body.appendChild(div)
  })
}

Player.prototype.serverUpdate = function () {
  this.socket.emit('lookWhatIdid', this.recentActions)
  this.recentActions = []

  setTimeout(this.serverUpdate.bind(this), 45)
}

Player.prototype.update = function () {
  var dt = Date.now() - this.lastUpdate
  this.lastUpdate += dt

  this.move(dt)

  setTimeout(this.update.bind(this), 15)
}

Player.prototype.move = function (dt) {
  var prePos = {x: this.pos.x, y: this.pos.y}

  if (this.movement['up']) {
    this.pos.y -= this.velocity * dt
  }
  if (this.movement['down']) {
    this.pos.y += this.velocity * dt
  }
  if (this.movement['left']) {
    this.pos.x -= this.velocity * dt
  }
  if (this.movement['right']) {
    this.pos.x += this.velocity * dt
  }

  if (this.pos.x !== prePos.x || this.pos.y !== prePos.y) {
    this.recentActions.push({
      x: this.pos.x - prePos.x,
      y: this.pos.y - prePos.y
    })
  }
}

Player.prototype.updateMovement = function (e) {
  this.movement[e.detail.input] = e.detail.state
}
