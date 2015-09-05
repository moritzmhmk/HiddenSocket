Player = function() {
  this.pos = {x: 0, y: 0};
};

Player.prototype.move = function(delta) {
  this.pos.x += delta.x;
  this.pos.y += delta.y;
}
