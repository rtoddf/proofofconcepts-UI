// http://tech.saigonist.com/b/code/how-detect-swipe-touch-event-mobile-browsers-javascript

console.log('swipes')

// var down = false;
// $(document).mousedown(function() {
//     down = true;
// }).mouseup(function() {
//     down = false;  
// });



// $('p').on('dragstart', function(){
// 	console.log('woo')
// })

// $('p').on('dragstop', function(){
// 	console.log('woo')
// })

// document.addEventListener('touchstart', handleTouchStart, false);
// document.addEventListener('touchmove', handleTouchEnd, false);

// document.addEventListener('mousedown', handleTouchStart, false);
// document.addEventListener('mouseup', handleTouchEnd, false);

$('p').on('mousedown', handleTouchStart)
$('p').on('mouseup', handleTouchEnd)

var xDown = null;
var yDown = null;
var xUp = null;
var yUp = null;
var amountMoved = null;

function handleTouchStart(e){
	xDown = e.clientX;
	yDown = e.clientX;
};

function handleTouchEnd(e){
	xUp = e.clientX;
	yUp = e.clientX;
	amountMoved = xDown - xUp

	if(amountMoved > 0){
		console.log('move left: ', amountMoved)
	} else {
		console.log('move right: ', amountMoved)
	}
}

// function reset(){
// 	xDown = null;
// 	yDown = null;
// 	xUp = null;
// 	yUp = null;
// 	amountMoved = null;
// }

// function handleDragStart(e){
// 	console.log('boobs')
//     // $(this).css({'opacity': '0.4'})

//     // dragSrcEl = this

//     // e.originalEvent.dataTransfer.effectAllowed = 'move'
//     // e.originalEvent.dataTransfer.setData('text/html', $(this).html())
// }