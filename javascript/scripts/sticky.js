// http://www.webdesignerdepot.com/2014/05/how-to-create-an-animated-sticky-header-with-css3-and-jquery/

var scroll_limit = $('.previous').height()
var original_margin = $('.next').css('margin-top')
var new_margin = $('header').height() + parseInt(original_margin)

$(window).scroll(function() {
	if ($(this).scrollTop() > scroll_limit){
		$('header').css({ top: 0, left: 0 }).addClass('sticky');
		$('.next').css('margin-top', new_margin)
	} else {
    	$('header').removeClass('sticky');
    	$('.next').css('margin-top', original_margin)
	}
});