$(document).ready(function(){
	var offset = 100;
	var animationDiv = $('#' + $('.animation-enlarge').attr('id'))
	var previousDiv = $('#' + animationDiv.prev('.parallax-group').attr('id'))
	var nextDiv = $('#' + animationDiv.next('.parallax-group').attr('id'))

	$('.parallax').on('scroll', function () {
		var scrollPosition = $('.parallax').scrollTop();

		if(scrollPosition > previousDiv.height() - offset){
			animationDiv.find('.back').addClass('animate')
		} else if(scrollPosition > animationDiv.position().top + animationDiv.height() || scrollPosition < (animationDiv.position().top - offset)){
			animationDiv.find('.back').removeClass('animate')
		}
	});
});