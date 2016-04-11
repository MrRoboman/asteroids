function MovingObject(args) {
  this.pos = args.pos       || [0,0];
  this.vel = args.vel       || [0,0];
  this.radius = args.radius || 1;
  this.color = args.color   || "#000";
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
};

module.exports = MovingObject;
