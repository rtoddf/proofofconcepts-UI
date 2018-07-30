$(document).ready(function() {
	if(game.init()){
		game.start()
	}
 })

var game = new Game()

// define an object to hold all out images, so images are only created once. 
// this type of object is known as a singleton
var imageRepo = new function(){
	// define images
	this.empty = null
	this.background = new Image()
	this.background.src = 'images/bg.png'
}

// creates a drawable objevy which will be the base class
// for all drawable objects. Sets up default vars that
// all child objects wil inherit, as well as the default
// functions
function Drawable(){
	this.init = function(x, y){
		// default vars
		this.x = x
		this.y = y
	}

	this.speed = 0
	this.canvasWidth = 0
	this.canvasHeight = 0

	//define abstract function to be implemented in child objects
	this.draw = function(){ 
 
	}
}

function Background(){
	this.speed = 1

	// implement abstract function
	this.draw = function(){
		// pan background
		this.y += this.speed
		this.context.drawImage(imageRepo.background, this.x, this.y)

		// draw another image at the top of the first image
		this.context.drawImage(imageRepo.background, this.x, this.y - this.canvasHeight)

		// if the image scrolled off the screen, reset
		if (this.y >= this.canvasHeight)
			this.y = 0
	}
}

// set Background to inherit from Drawable
Background.prototype = new Drawable()

// creates the object which will hold all objects and data for the game
function Game(){
	this.init = function(){
		this.bgCanvas = $('#example').get(0)

		// test to see if canvas is supported
		if(this.bgCanvas.getContext){
			this.bgContext = this.bgCanvas.getContext('2d')

			// initialize objects to contain their context and canvas info
			Background.prototype.context = this.bgContext
			Background.prototype.canvasWidth = this.bgCanvas.width
			Background.prototype.canvasHeight = this.bgCanvas.height

			// initialize the background object
			this.background = new Background()
			this.background.init(0,0)
			return true
		} else {
			return false
		}
	}

	// start the animation loop
	this.start = function(){
		animate()
	}
}

function animate(){
	requestAnimFrame(animate)
	game.background.draw()
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame    || 
      window.oRequestAnimationFrame      || 
      window.msRequestAnimationFrame     || 
      function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 60)
      }
})()