// $(function(){
// 	var $container = $('.container');

// 	$container.isotope({
// 		itemSelector: '.element',
// 		layoutMode : 'fitRows'
// 	});

// });

// $('.container').isotope({
// 	masonry: {
// 		columnWidth: 120
// 	}
// });

$('.container').isotope({
	masonryHorizontal: {
		rowHeight: 100
	}
});

$('.element').on('click', function(){
	// $(this).css('z-index', 10)
	// $(this).animate({
	// 	height: $(this).find('h5').outerHeight() + $(this).find('p').outerHeight() + 30
	// })
	// $('.element').animate({
	// 	height: 200
	// })
})