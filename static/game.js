var player = new Player(io())
var players = []

window.onload = function () {
  keyboardInput.setup()
  gamepadInput.setup()
  window.addEventListener('userbuttoninput', player.updateMovement.bind(player))
}

var lastRender = Date.now()
function render () {
  var dt = Date.now() - lastRender
  window.requestAnimationFrame(render)

  document.getElementById('local').style.left = player.pos.x * 10
  document.getElementById('local').style.top = player.pos.y * 10

  players.forEach(function (ele, i, arr) {
    if (player.id === i) return

    document.getElementById('player_' + i).style.left = ele.x * 10
    document.getElementById('player_' + i).style.top = ele.y * 10
  })

  lastRender += dt
}
