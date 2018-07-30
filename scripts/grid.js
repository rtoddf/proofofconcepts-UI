var rowIterator = 4 // sets the number of boxes per row - the iterator must be divisible by 12 - foundation grid
var pageIterator = 12 // sets the number of boxes per page
var currentPage = 1

// set globals for plugins
var opportunities,
	opportunityMatches,
	pages

$(document).ready(function(){ Opportunities.get() })
$('#searchInitiate').click(function(){ Search.handleForm() })

// SEARCH FIELDS
var Search = new function(){
	var fields = []

	// get the data to put in the search/filter form
	this.get = function(){
		$.getJSON('data/opportunity_search_thebackup.json', function(search){
			for(keys in search[0]){
				var values = function(){
					if(typeof(search[0][keys]) == 'object'){
						multipleValues = []
						$.each(search[0][keys], function(i, val){
							multipleValues.push(val)
						})
						return multipleValues
					} else {
						return [ search[0][keys] ]
					}
				}()
				
				var field = [ keys, values ]
				fields.push(field)
			}
			Search.render()
		})
	}

	// render all the filters
	this.render = function(){
		var template_search = $('.template_search').html();
		var template_search_compiled = _.template(template_search, {
			data: fields,
			starter: 0
		})
		$('#search').append(template_search_compiled)
	}

	// handle select options
	this.handleForm = function(){
		var choicesMade = false // we originally set choices to false
		var filters = new Object()
		$('#search :selected').each(function(i, selected){
			if($(selected).text() !== 'All'){
				filters[$(selected).parent().attr('id')] = $(selected).text()
				choicesMade = true
			}
		})

		// activate the search based on if there were filter choices made
		opportunityMatches = !choicesMade ? opportunities : _.where(opportunities, filters)
		Opportunities.render(opportunityMatches, pages, 0, 1)
		$('#pagination').paginate()
	}
}

// Opportunities
var Opportunities = new function(){
	var url = 'data/opportunities.json'
	// get the data for all records
	this.get = function(){
		$.ajax({
			url: url,
			success: function(data) {
				console.log('success: ', data)
				opportunities = data
		},
			dataType: 'json',
			complete: function(){
				console.log('complete')
				Search.get()
			}
		});

		// $.getJSON('data/opportunities.json', function(data){
		// 	opportunities = data
		// 	Search.get()
		// })
	}

	// render the underscore template to create the grid
	this.render = function(opportunityMatches, pages, starter, currentPage){
		$('#content').html('')
		var template_raw = $('.template_grid').html()
		var template_compiled = _.template(template_raw, { 
			data: opportunityMatches,
			starter: starter,
			rowIterator: 12 / rowIterator,
			pageIterator: pageIterator,
			pages: pages,
			currentPage: currentPage
		})

		$('#content').html(template_compiled)
		$('.grid-viewer').gridify()
	}
}

$.fn.paginate = function(options){
	var settings = $.extend({
		currentPage: currentPage,
		pageSelectors: '#pagination #pageNumbers a',
		previousNextSelectors: '#pagination .previous, #pagination .next'
	}, options);

	$('#pagination #pageNumbers').html('') // we reset the pagination for when new filters come through
	
	// these lines are just to show the number of results
	// wont' be needed in the final
	$('#totalSearchResults').html(opportunityMatches.length)
	$('#totalResults').html(opportunities.length)
	$('#paginationResults').show()

	if(opportunityMatches.length > pageIterator){
		pages = Math.ceil(opportunityMatches.length / pageIterator)
		for(var i=1;i<=pages;i++){
			pageHtml = '<a href="#" data-page="' + i + '">' + i + '</a>'
			$('#pagination #pageNumbers').append(pageHtml)
		}
		$(settings.pageSelectors).filter('[data-page="' + settings.currentPage + '"]').addClass('current-page')
		$('#pagination').show()
	} else {
		$('#pagination').hide()
	}

	setPagination()

	$(settings.pageSelectors).add($(settings.previousNextSelectors)).on('click', function(e){
		e.preventDefault()
		$(settings.pageSelectors).removeClass('current-page')
		if($(e.target).hasClass('previous') || $(e.target).hasClass('next')){
			var incrementer = $(e.target).attr('class').split(' ')[0] == 'previous' ? -1 : 1
			settings.currentPage = parseInt(settings.currentPage) + parseInt(incrementer)
			$(settings.pageSelectors).filter('[data-page="' + settings.currentPage + '"]').addClass('current-page')
		} else {
			settings.currentPage = $(e.target).attr('data-page')
			$(e.target).addClass('current-page')
		}
		setPagination()
	})

	function setPagination(){
		// these two lines aren't pagination - move them
		var nextSetStarter = settings.currentPage == 1 ? 0 : ((settings.currentPage-1) * pageIterator)
		Opportunities.render(opportunityMatches, pages, nextSetStarter, settings.currentPage)
		if(settings.currentPage == 1) {
			$('.previous').addClass('hide')
			$('.next').removeClass('hide')
		} else if(settings.currentPage == pages) {
			$('.previous').removeClass('hide')
			$('.next').addClass('hide')
		} else {
			$('.previous').removeClass('hide')
			$('.next').removeClass('hide')
		}
	}
}

// PLUGIN
$.fn.gridify = function(options){
	var settings = $.extend({
		speed: 300,
		closeIcon: 'fa-caret-up',
		openIconClass: '.fa-caret-down',
		initHeightVariant: 20,
		outHeightVarient: 13,
		animationFinished: 'animation done'
	}, options);

	var initHeight, outHeight;

	$('.grid-cell').each(function(i, obj){
		initHeight = $(obj).find('.force-height').outerHeight() + settings.initHeightVariant
		outHeight = $(obj).outerHeight() - settings.outHeightVarient
		$(obj).find('.inner').height(initHeight)
	});

	$('.expand-all, .collapse-all, .expand-control').on('click', function(el){
		// we need to take care of the arrow if clicked,
		// otherwise its the target area clicked
		var _this = $(el.target).is('i.fa-caret-up') || $(el.target).is('i.fa-caret-down') ? $(el.target).parent() : $(el.target)
		var trigger = _this.attr('class').split(' ').pop()
		var target = (trigger == 'expand-all' || trigger == 'collapse-all') ? $('.grid-cell') : _this.closest('.grid-cell')

		if((trigger == 'expand-all') || (trigger == 'expand-control' && $(target).hasClass('unselected'))){
			var newHeight = outHeight
			target.removeClass('unselected')
			target.find(settings.openIconClass).addClass(settings.closeIcon)
		} else if((trigger == 'collapse-all') || (trigger == 'expand-control' && !$(target).hasClass('unselected'))){
			var newHeight = initHeight
			target.addClass('unselected')
			target.find(settings.openIconClass).removeClass(settings.closeIcon)
		}

		target.find('.inner').animate({
			height: newHeight
		}, settings.speed, function(){
			// activate a function when the animation is done if desired
			// option to pass: settings.animationFinished
		})
	});
};

// leaving this isDefined method for possible later use
// var isDefined = function(obj){
// 	return typeof(obj) !== 'undefined' && obj !== null ? obj : ''
// }

// $('.clear_filters').on('click', function(){
// 	$('#search select').each(function(){
// 		$('#search option[selected="selected"]').each(
// 			function() {
// 				$(this).removeAttr('selected');
// 			}
// 		);
// 		$("#search option:first").attr('selected','selected');
// 	})
// })