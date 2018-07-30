var rowIterator = 4, // the iterator must be divisible by 12 - foundation grid
	pageIterator = 12,
	choicesMade = false,
	opportunities,
	currentPage = 1,
	matches,
	pages,
	page = 1

$(document).ready(function(){
	// once the dom is ready, get data
	Opportunity.get()
})

$('.search_go').click(function(){
	var filters = new Object()
	$('#search :selected').each(function(i, selected){
		if($(selected).text() !== 'All'){
			filters[$(selected).parent().attr('id')] = $(selected).text();
			choicesMade = true
		}
	});

	Search.handleForm(filters)
})

// SEARCH FIELDS
var Search = new function(){
	var fields = []

	// get the data to put in the search/filter form
	this.get = function(){
		$.getJSON('data/opportunity_search.json', function(search){
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
	this.handleForm = function(filters){
		$('#pagination #pageNumbers').html('')
		// activate the search based on if there were filter choices made
		matches = !choicesMade ? opportunities : _.where(opportunities, filters)
		$('#totalSearchResults').html(matches.length)
		$('#totalResults').html(opportunities.length)
		$('#paginationResults').show()

		if(matches.length > pageIterator){
			pages = Math.ceil(matches.length / pageIterator)
			for(var i=1;i<=pages;i++){
				pageHtml = '<a href="#" data-page="' + i + '">' + i + '</a>'
				$('#pagination #pageNumbers').append(pageHtml)
			}
			$('#pagination').show()
		} else {
			$('#pagination').hide()
		}

		Opportunity.render(matches, pages, 0, page)
		Opportunity.handlePagination()
	}
}

// Opportunities
var Opportunity = new function(){
	// get the data for all records
	this.get = function(){
		$.getJSON('data/opportunities.json', function(data){
			opportunities = data
			Search.get()
		})
	}

	this.handlePagination = function(){
		previousNext()

		$('#pagination #pageNumbers a').on('click', function(e){
			e.preventDefault()
			currentPage = $(e.target).attr('data-page')
			var nextSetStarter = currentPage == 1 ? 0 : ((currentPage-1) * pageIterator)
			Opportunity.render(matches, pages, nextSetStarter, currentPage)
			previousNext()
		})

		$('#pagination .previous, #pagination .next').on('click', function(e){
			e.preventDefault()
			var incrementer = $(e.target).attr('class').split(' ')[0] == 'previous' ? -1 : 1
			currentPage = parseInt(currentPage) + parseInt(incrementer)
			var nextSetStarter = currentPage == 1 ? 0 : ((currentPage-1) * pageIterator)
			Opportunity.render(matches, pages, nextSetStarter, currentPage)
			previousNext()
		})

		function previousNext(){
			if(currentPage == 1){
				$('.previous').hide()
			} else if(currentPage == pages) {
				$('.next').show()
			} else {
				$('.previous').show()
				$('.next').show()
			}
		}
		
	}

	// render the underscore template to create the grid
	this.render = function(matches, pages, starter, page){
		howManyLeft = matches.length % pageIterator
		$('#content').html('')
		var template_raw = $('.template_grid').html()
		var template_compiled = _.template(template_raw, { 
			data: matches,
			starter: starter,
			rowIterator: 12 / rowIterator,
			pageIterator: pageIterator,
			pages: pages,
			page: page
		})

		$('#content').html(template_compiled)
		$('.grid-viewer').gridify()
	}
}

// PLUGIN
$.fn.gridify = function(options) {
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
		// why are you having to add and subtract pixels
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
var isDefined = function(obj){
	return typeof(obj) !== 'undefined' && obj !== null ? obj : ''
}

$('.clear_filters').on('click', function(){
	$('#search select').each(function(){
		$('#search option[selected="selected"]').each(
			function() {
				$(this).removeAttr('selected');
			}
		);
		$("#search option:first").attr('selected','selected');
	})
})