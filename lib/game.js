var Asteroid = require("./asteroid.js");

function Game() {
  this.DIM_X = 400;
  this.DIM_Y = 400;
  this.NUM_ASTEROIDS = 5;
  this.asteroids = [];
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.addAsteroid();
  }
}

Game.prototype.addAsteroid = function() {
  var asteroid = new Asteroid({ pos: this.randomPosition() });
  this.asteroids.push(asteroid);
};

Game.prototype.randomPosition = function() {
  var x = Math.random() * this.DIM_X;
  var y = Math.random() * this.DIM_Y;
  return [x, y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.asteroids.forEach(function (asteroid) {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(function (asteroid){
    asteroid.move();
  });
};

Game.prototype.wrap = function(pos){

};


module.exports = Game;
