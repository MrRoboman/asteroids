/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(5);

	(function() {
	  var canvas = document.getElementsByTagName("canvas")[0];
	  var game = new Game();

	  canvas.width = game.DIM_X;
	  canvas.height = game.DIM_Y;

	  var ctx = canvas.getContext("2d");

	  var gameView = new GameView(game, ctx);

	  gameView.start();
	}());


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__(2);
	var Ship = __webpack_require__(6);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(4);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Util() {}

	Util.inherits = function (ChildClass, ParentClass) {
	  function Surrogate() {}
	  Surrogate.prototype = ParentClass.prototype;
	  ChildClass.prototype = new Surrogate();
	  ChildClass.prototype.constructor = ChildClass;
	};

	Util.randomVel = function(length) {
	  var x = Math.random() * 10 - 5;
	  var y = Math.random() * 10 - 5;
	  x = Math.random() * 2 - 1;
	  y = Math.random() * 2 - 1;
	  return [x,y];
	};

	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	

	var Game = __webpack_require__(1);
	//
	//
	//
	function GameView(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	}
	//
	GameView.prototype.start = function() {
	  setInterval(function (){
	    this.game.step();
	    this.game.draw(this.ctx);
	  }.bind(this), 20);
	};

	GameView.prototype.bindKeyHandlers = function() {
	  key('a', function(){ alert('you pressed a!') });
	};

	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(4);

	function Ship(args) {
	  this.COLOR = "#a24f37";
	  this.RADIUS= 30;

	  args.color = this.COLOR;
	  args.radius = this.RADIUS;


	  MovingObject.call(this, args);
	}

	Util.inherits(Ship, MovingObject);

	module.exports = Ship;


/***/ }
/******/ ]);