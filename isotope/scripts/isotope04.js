var isDefined = function(obj){
	return typeof(obj) !== 'undefined' && obj !== null ? obj : ''
}

var Person = function(detail){
	this.name = isDefined(detail.name)
	this.photo = isDefined(getPhoto(detail.name))
	this.type = isDefined(detail.group)
	this.data = isDefined(detail.data)
}

function getPhoto(name, type){
	var image_name = name.toLowerCase().replace(/ |\//g,'_').replace(/\(|\)|\.|\'|\,/g, '').replace('é', 'e').replace('ë', 'e') + '.jpg'
	return image_name
}

var People = new function(){
	this.get = function(){
		people = []

		$.getJSON('../data/people.json', function(data){
			data.forEach(function(pers){
				var person = new Person(pers)
				people.push(person)
			})

			people = _.sortBy(people, function(a){
				return (a.name).split(' ').pop()
			})

			People.renderTemplate(people)
		})
	}

	this.renderTemplate = function(people){
		var template = _.template(template_raw, {
			data: people
		})
		$('.isotope_container').html(template)

		People.setUpIsotope()
	}

	this.setUpIsotope = function(){
		$('.isotope_container').isotope({
			// filter: '.politics'
		})
	}
}

People.get()

var template_raw = '<% for(var i=0; i<people.length; i++){ %> \
	<div class="col-md-3 element <%= people[i].type %>" data-category="<%= people[i].type %>"> \
		<img src="../images/people/<%= people[i].type %>/<%= people[i].photo %>" /> \
		<h5><%= people[i].name %></h5> \
	</div> \
<% } %>'

$('.sort').on('click', function(){
	var category = $(this).data('category')
	$('.isotope_container').isotope({
		filter: category
	})
})