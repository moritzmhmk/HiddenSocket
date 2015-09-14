var player = new Player()

window.onload = function () {
  keyboardInput.setup()
  gamepadInput.setup()
  window.addEventListener('userbuttoninput', player.updateMovement.bind(player))
}

var lastRender = Date.now()
function render () {
  var dt = Date.now() - lastRender
  var fps = 1000 / dt

  window.requestAnimationFrame(render)

  document.getElementById('local').style.left = player.pos.x * 10
  document.getElementById('local').style.top = player.pos.y * 10

  lastRender += dt
}
