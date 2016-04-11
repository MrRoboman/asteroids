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
	  return [x,y];
	};

	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports) {

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
	    this.game.moveObjects();
	    this.game.draw(this.ctx);
	  }.bind(this), 20);
	};

	module.exports = GameView;


/***/ }
/******/ ]);