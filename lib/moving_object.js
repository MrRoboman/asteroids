function MovingObject(args) {
  this.game = args.game;
  this.pos = args.pos       || [0,0];
  this.vel = args.vel       || [0,0];
  this.radius = args.radius || 1;
  this.color = args.color   || "#000";
  this.canCollide = true;
  this.maxVel = 3;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.stroke();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.wrap();
};

MovingObject.prototype.wrap = function() {
  if(this.pos[0] > this.game.DIM_X + this.radius){
    this.pos[0] = -this.radius;
  } else if (this.pos[0] < -this.radius) {
    this.pos[0] = this.game.DIM_X + this.radius;
  }

  if(this.pos[1] > this.game.DIM_Y + this.radius){
    this.pos[1] = -this.radius;
  } else if (this.pos[1] < -this.radius) {
    this.pos[1] = this.game.DIM_Y + this.radius;
  }
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  var dx = (this.pos[0] - otherObject.pos[0]);
  var dy = (this.pos[1] - otherObject.pos[1]);

  var distance = Math.sqrt((dx * dx) + (dy * dy));
  return distance < this.radius + otherObject.radius;
};

module.exports = MovingObject;
