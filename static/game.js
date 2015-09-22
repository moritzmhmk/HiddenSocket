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

  document.getElementById('local').style.left = player.predicted_pos.x * 5
  document.getElementById('local').style.top = player.predicted_pos.y * 5
  document.getElementById('local_ghost').style.left = player.pos.x * 5
  document.getElementById('local_ghost').style.top = player.pos.y * 5

  players.forEach(function (ele, i, arr) {
    if (player.id === i) return

    document.getElementById('player_' + i).style.left = ele.x * 5
    document.getElementById('player_' + i).style.top = ele.y * 5
  })

  lastRender += dt
}
