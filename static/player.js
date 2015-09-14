var Player = function () {
  this.velocity = 0.01
  this.pos = {x: 0, y: 0}
  this.movement = {up: false, down: false, right: false, left: false}

  this.lastUpdate = Date.now()
  this.update()
}

Player.prototype.update = function () {
  var dt = Date.now() - this.lastUpdate
  this.lastUpdate += dt

  this.move(dt)

  setTimeout(this.update.bind(this), 15)
}

Player.prototype.move = function (dt) {
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
}

Player.prototype.updateMovement = function (e) {
  this.movement[e.detail.input] = e.detail.state
}
