var Asteroid = require("./asteroid.js");
var Ship = require("./ship.js");

function Game() {
  this.DIM_X = 600;
  this.DIM_Y = 600;
  this.NUM_ASTEROIDS = 30;

  this.ship = new Ship({pos:[this.DIM_X / 2,this.DIM_Y / 2], game: this});

  this.asteroids = [];
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.addAsteroid();
  }
}

Game.prototype.addAsteroid = function() {
  var asteroid = new Asteroid({ pos: this.randomPosition(), game: this});
  this.asteroids.push(asteroid);
};

Game.prototype.randomPosition = function() {
  var x = Math.random() * this.DIM_X;
  var y = Math.random() * this.DIM_Y;
  return [x, y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach(function (asteroid) {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(function (asteroid){
    asteroid.move();
  });
};

Game.prototype.checkCollisions = function() {
  var colors = ['red', 'orange', 'yellow', 'green', 'brown', 'black', 'blue', 'purple'];
  var color = colors[Math.floor(Math.random()*colors.length)];
  for (var i = 0; i < this.asteroids.length - 1; i++) {
    if(this.ship.isCollidedWith(this.asteroids[i])){
      this.ship.color = color;
    }
    for (var j = i+1; j < this.asteroids.length; j++){
      if(this.asteroids[i].isCollidedWith(this.asteroids[j])){
        if (!(this.asteroids[i].canCollide || this.asteroids[j].canCollide)) {
          continue;
        }
        // else {
        //   this.asteroids[i].canCollide = true;
        //   this.asteroids[j].canCollide = true;
        // }


        this.asteroids[i].color = color;
        this.asteroids[j].color = color;
        var a = this.asteroids[i];
        var b = this.asteroids[j];



        var velAx = (a.vel[0] + (2* b.vel[0]))/2;
        var velAy = (a.vel[1] + (2* b.vel[1]))/2;
        var velBx = (b.vel[0] + (2* a.vel[0]))/2;
        var velBy = (b.vel[1] + (2* a.vel[1]))/2;
        // var velA = Math.sqrt((a.vel[0] * a.vel[0]) + (a.vel[1] * a.vel[1]));
        // var velB = Math.sqrt((b.vel[0] * b.vel[0]) + (b.vel[1] * b.vel[1]));
        // a.vel[0] += velB;
        // a.vel[1] += velB;
        // b.vel[0] += velA;
        // b.vel[1] += velA;
        // if(velAx > 0 && velBx > 0 ){
        //   velAx = 2;
        //   velBx = 1;
        // }
        // if(velAy > 0 && velBy > 0 ){
        //   velAy = 2;
        //   velBy = 3;
        // }
        a.vel[0] = velAx;
        a.vel[1] = velAy;
        b.vel[0] = velBx;
        b.vel[1] = velBy;

        // if(a.vel[0] > a.maxVel) {
        //   a.vel[0] = a.maxVel;
        // }
        // if (a.vel[0] < -a.maxVel){
        //   a.vel[0] = -a.maxVel;
        // }
        //
        // if(a.vel[1] > a.maxVel ) {
        //   a.vel[1] = a.maxVel;
        // }
        // if (a.vel[1] < -a.maxVel){
        //   a.vel[1] = -a.maxVel;
        // }
        //
        // if(b.vel[0] > b.maxVel ) {
        //   b.vel[0] = b.maxVel;
        // }
        // if (b.vel[0] < -b.maxVel){
        //   b.vel[0] = -b.maxVel;
        // }
        //
        // if(b.vel[1] > b.maxVel ) {
        //   b.vel[1] = b.maxVel;
        // }
        // if (b.vel[1] < -b.maxVel){
        //   b.vel[1] = -b.maxVel;
        // }




        this.asteroids[i].canCollide = false;
        this.asteroids[j].canCollide = false;
      }
    }
  }
};

Game.prototype.resetCollide = function() {
  for (var i = 0; i < this.asteroids.length - 1; i++) {
    var a = this.asteroids[i];
    if(!a.canCollide){
      var doit = true;
      for (var j = 0; j < this.asteroids.length; j++){
        if(i===j) {continue;}
        var b = this.asteroids[j];
        if(a.isCollidedWith(b)){
          doit = false;
          break;
        }
      }
      if(doit) {a.canCollide = true;}
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
  this.resetCollide();
};

Game.prototype.allObjects = function() {
  return [this.ship].concat(this.asteroids);
};

// Game.prototype.remove = function(asteroid) {
//   this.asteroids
// };


module.exports = Game;
