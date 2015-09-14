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

  for (var playerId in players) {
    if (playerId == player.id) continue;
    var opl = players[playerId]

    document.getElementById('player_' + playerId).style.left = opl.x * 10
    document.getElementById('player_' + playerId).style.top = opl.y * 10
  }

  lastRender += dt
}
