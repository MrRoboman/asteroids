var Util = require('./utils.js');
var MovingObject = require('./moving_object.js');

function Ship(args) {
  this.COLOR = "#a24f37";
  this.RADIUS= 30;

  args.color = this.COLOR;
  args.radius = this.RADIUS;


  MovingObject.call(this, args);
}

Util.inherits(Ship, MovingObject);

module.exports = Ship;
