'use strict'
var Input = function () {}
Input.prototype.buttonInputStates = {}
Input.prototype.dispatchUserButtonInputEvent = function (source, input, state) {
  if (this.buttonInputStates[source] === undefined) { this.buttonInputStates[source] = {} }
  if (this.buttonInputStates[source][input] === state) { return }
  this.buttonInputStates[source][input] = state

  var userButtonInputEvent = new window.CustomEvent(
    'userbuttoninput',
    {'detail': {'source': source, 'input': input, 'state': state}}
  )

  window.dispatchEvent(userButtonInputEvent)
}

var keyboardInput = new Input()
keyboardInput.map = {
  37: 'left', // LEFT arrow
  38: 'up', // UP arrow
  39: 'right', // right arrow
  40: 'down', // down arrow
  65: 'left', // A
  87: 'up', // W
  68: 'right', // D
  83: 'down' // S
}
keyboardInput._key = function (state, event) {
  if (this.map[event.keyCode] === undefined) { return }
  this.dispatchUserButtonInputEvent('keyboard', this.map[event.keyCode], state === 'down')
}
keyboardInput.setup = function () {
  window.addEventListener('keydown', function (e) { this._key('down', e) }.bind(this))
  window.addEventListener('keyup', function (e) { this._key('up', e) }.bind(this))
}

var gamepadInput = new Input()
gamepadInput.map = {
  14: 'left',
  12: 'up',
  15: 'right',
  13: 'down'
}
gamepadInput._states = {}
gamepadInput.setup = function () {
  window.addEventListener('gamepadconnected', function (e) {
    console.log('Gamepad ' + e.gamepad.index + ' connected!')
    this._checkState(e.gamepad.index)
  }.bind(this))
}
gamepadInput._checkState = function (index) {
  var gp = navigator.getGamepads()[index]
  if (gp === undefined) {
    console.log('Gamepad ' + index + ' disconnected!')
    return
  }
  console.debug('checking', gp)
  if (this._states[gp.index] === undefined) { this._states[gp.index] = {buttons: [], axes: []} }
  /* for(var i=0; i<gp.axes.length; i++) {
    if(gamepadStates[gp.index].axes[i] !== undefined && gamepadStates[gp.index].axes[i] != gp.axes[i])
      axisChanged(gp, i, gp.axes[i])
    gamepadStates[gp.index].axes[i] = gp.axes[i]
  }*/
  for (var i = 0; i < gp.buttons.length; i++) {
    if (this._states[gp.index].buttons[i] !== undefined && this._states[gp.index].buttons[i] !== gp.buttons[i].pressed) {
      this._buttonChanged(gp, i, gp.buttons[i].pressed)
    }
    this._states[gp.index].buttons[i] = gp.buttons[i].pressed
  }
  window.setTimeout(function () { this._checkState(index) }.bind(this), 100)
}
gamepadInput._buttonChanged = function (gamepad, button, state) {
  console.log('gamepad button "' + button + '" was ' + (state ? 'pressed' : 'released'))
  if (this.map[button] === undefined) { return }
  this.dispatchUserButtonInputEvent('gamepad_' + gamepad.index, this.map[button], state)
}
