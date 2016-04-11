var Util = require('./utils.js');
var MovingObject = require('./moving_object.js');

function Asteroid(args) {
  this.COLOR = "#000";
  this.RADIUS= 10;

  args.color = this.COLOR;
  args.radius = this.RADIUS;
  args.vel = Util.randomVel();

  MovingObject.call(this, args);
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
