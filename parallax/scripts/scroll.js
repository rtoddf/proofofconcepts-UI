$(document).ready(function(){

	$(window).on('scroll', function () {
		console.log('scrolling')
	    var scrollTop = $(window).scrollTop(); //how far youve scrolled down the window
	    var parallax = 1 * (scrollTop / 3);
		$('.site-body').css('background-position', 'center ' + parallax + 'px');
	});

});
        