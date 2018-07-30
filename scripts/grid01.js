var rowIterator = 4,
	pageInterator = 12,
	numRecords,
	numPages,
	numRemainingRecords

var isDefined = function(obj){
	return typeof(obj) !== 'undefined' && obj !== null ? obj : ''
}

var opportunities

var Opportunity = new function(){
	this.get = function(){
		$.getJSON('data/opportunities.json', function(data){
			opportunities = data
			Search.get()
		})
	}

	this.render = function(m){
		$('#content').html('')
		console.log('m: ', m)
		var template = _.template(template_raw, {
			data: m,
			starter: 0
		})
		// if(numPages > 1){
		// 	for(var i=1;i<=numPages; i++){
		// 		$('.pagination').find('span').append('<a tabindex="0" class="paginate_active">' + i + '</a>')
		// 	}
		// 	$('.pagination').show()
		// }
		$('#content').html(template)
		$('.grid-viewer').gridify();
	}
}

var Search = new function(){
	var fields = []

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

	this.render = function(){
		var template = _.template(template_search, {
			data: fields,
			starter: 0
		})
		$('#search').append(template)

		Search.handleForm()
	}

	this.handleForm = function(){
		$('#search select').on('change', function(t){
			var matches = getObjects(opportunities, $(this).attr('id'), $('option:selected', $(this)).val())
			console.log('matches	: ', matches)
			Opportunity.render(matches)
		})

		function getObjects(obj, key, val) {
			var objects = [];
			for (var i in obj) {
				if (!obj.hasOwnProperty(i)) continue;
				if (typeof obj[i] == 'object') {
					objects = objects.concat(getObjects(obj[i], key, val));
				} else if (i == key && obj[key] == val) {
					objects.push(obj);
				}
			}
			return objects;
		}
	}
}



$(document).ready(function() {
	Opportunity.get()
})

var template_search = '<% for(var i=0; i<data.length; i++){ %> \
	<div class="small-6 columns"> \
		<div> \
			<h5><%= data[i][0] %></h5> \
			<select id="<%= (data[i][0]).replace(" ", "_").toLowerCase() %>"> \
				<% for(var j=0; j<data[i][1].length; j++){ %> \
					<option value="<%= data[i][1][j] %>"><%= data[i][1][j] %></option> \
				<% } %> \
			</select> \
		</div> \
	</div> \
<% } %>'

var template_raw = '<% console.log("data: ", data) %> \
<% var j = 0 %> \
	<% for(var i=starter; i<data.length; i++){ %> \
		<% console.log("data[i]: ", data[i].name) %> \
		<% if (i < data.length){ %> \
			<% if (j == 0){ %> \
				<div class="row grid-viewer"> \
			<% } %> \
				<div class="small-3 grid-cell columns left unselected"> \
					<div class="inner"> \
						<div class="small-12 columns opportunity-name"> \
							<%= data[i].name %> \
						</div> \
						<div class="small-12 columns force-height"> \
							<div class="row"> \
								<div class="small-6 columns opportunity-number"> \
									<%= data[i].number %> \
								</div> \
								<div class="small-6 columns opportunity-price"> \
									<%= data[i].price %> \
								</div> \
								<div class="small-6 columns"> \
									<%= data[i].city %> \
								</div> \
								<div class="small-6 columns"> \
									<%= data[i].date %> \
								</div> \
							</div> \
						</div> \
						<div class="small-12 columns"> \
							Product: <%= data[i].product %> \
						</div> \
						<div class="small-12 columns"> \
							Company: <%= data[i].company %> \
						</div> \
						<div class="small-12 columns"> \
							Rep: <%= data[i].rep_company %> \
						</div> \
						<div class="small-12 columns"> \
							Current Stage: <%= data[i].current_stage %> \
						</div> \
						<div class="small-12 columns"> \
							Sales Probability: <%= data[i].sales_probability %> \
						</div> \
						<div class="small-12 columns"> \
							RSE: <%= data[i].rse %> \
						</div> \
					</div> \
					<div class="small-12 columns expand-control"> \
						<i class="fa fa-caret-down"></i> \
					</div> \
				</div> \
				<% j++ %> \
			<% if (j == rowIterator){ %> \
				</div> \
				<% j = 0 %> \
			<% } %> \
		<% } %> \
	<% } %>'

// PLUGINS
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
			// console.log(settings.animationFinished)
		})
		
	});
};