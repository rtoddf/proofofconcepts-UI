var rowIterator = 4,
	pageInterator = 12,
	choicesMade = false,
	opportunities

$(document).ready(function(){
	// once the dom is ready, get data
	Opportunity.get()
})

// leaving this isDefined method for possible later use
var isDefined = function(obj){
	return typeof(obj) !== 'undefined' && obj !== null ? obj : ''
}

$('.clear_filters').on('click', function(){
	$('#search select').each(function(){
		// console.log($(this))
		$('#search option[selected="selected"]').each(
			function() {
				$(this).removeAttr('selected');
			}
		);
		$("#search option:first").attr('selected','selected');
	})
})

// Opportunities
var Opportunity = new function(){
	// get the data for all records
	this.get = function(){
		$.getJSON('data/opportunities.json', function(data){
			opportunities = data
			Search.get()
		})
	}

	// render the underscore template to create the grid
	this.render = function(m){
		$('#content').html('')
		var template_raw = $('.template_grid').html()
		var template_compiled = _.template(template_raw, { 
			data: m,
			starter: 0
		})

		$('#content').html(template_compiled)
		$('.grid-viewer').gridify()
	}
}

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

		Search.handleForm()
	}

	// handle select options
	this.handleForm = function(){
		// activate the search based on if there were filter choices made
		$('.search_go').click(function(){
			var filters = new Object()
			$('#search :selected').each(function(i, selected){
				var selection = []
				if($(selected).text() !== 'All'){
					filters[$(selected).parent().attr('id')] = $(selected).text();
					// selection[0] = $(selected).parent().attr('id')
					// selection[1] = $(selected).text();
					// filters.push(selection)
					choicesMade = true
				}
			});

			var matches = !choicesMade ? opportunities : _.where(opportunities, filters)

			Opportunity.render(matches)
			Search.handleForm()
		})
	}
}

function filtering(opportunities, filters){
	var filter = new Object()
	for (var i=0; i < filters.length; i++){
		filter[filters[i][0]] = filters[i][1]
	}
	return _.where(opportunities, filter)
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
		var trigger = $(el.target).attr('class').split(' ').pop()
		var target = (trigger == 'expand-all' || trigger == 'collapse-all') ? $('.grid-cell') : $(el.target).closest('.grid-cell')

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