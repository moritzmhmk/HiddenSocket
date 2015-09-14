var player = new Player()

document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 37: // LEFT
      player.move({x: -1, y: 0})
      break
    case 38: // UP
      player.move({x: 0, y: -1})
      break
    case 39: // RIGHT
      player.move({x: 1, y: 0})
      break
    case 40: // DOWN
      player.move({x: 0, y: 1})
      break
  }
}

var lastRender = Date.now()
function render () {
  var dt = Date.now() - lastRender
  var fps = 1000 / dt
  console.log('fps: ' + fps)

  window.requestAnimationFrame(render)

  document.getElementById('local').style.left = player.pos.x * 10
  document.getElementById('local').style.top = player.pos.y * 10

  lastRender += dt
}
