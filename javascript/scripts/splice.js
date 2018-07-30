var photoSource = 'photos-nine',
	photos

function setUpCompiledTemplate(start, end, size){
	return new Promise(function(resolve, reject) {
		// do a thing, possibly async, then…
		console.log('photos: ', photos)

		var photosArray = []

		for (var i = 0; i <= end; i++){
			photosArray.push(photos[i])
			console.log('photos[i]: ', photos[0])
			photos.splice(0, 1)
		}

		console.log('photos: ', photos)

		var template =  _.template(template_raw, {
			set: photosArray,
			sizeClass: size
		})

		var compiled = '<div class="flex-box">' + template + '</div>'

		if (compiled != undefined) {
			resolve(compiled);
		} else {
			reject(Error("It broke"));
		}
	});
}

var Grid = new function(){
	this.getImages = function(){
        $.getJSON('data/' + photoSource + '.json', function(data){
        	photos = data
        	
			Grid.setUp()
        })
	}

	

	this.setUp = function(){
		// setUpCompiledTemplate(0, 3, 'small').then(function(results){
	 //    	// access results here by chaining to the returned promise
	 //    	console.log('done')
		// });

		setUpCompiledTemplate(0, 3, 'small')
			.then(function(result) {
				$('#row-1').append(result)
				// console.log(result); // "Stuff worked!"
			})
			.catch(function(err){
				console.log(err); // Error: "It broke"
			})

		$('#row-1')
			.append(
				// setUpCompiledTemplate(0, 3, 'small')
				 // + setUpCompiledTemplate(4, 3, 'small')
				 // + setUpCompiledTemplate(8, 8, 'large')
			)

		// Grid.setOrder()
	}
}

var template_raw = '<% for (var i = 0; i < set.length; i++){ %> \
	<div class="tile <%= sizeClass %>"> \
		<img src="images/<%= set[i].image %>" alt="<%= set[i].name %>" title="<%= set[i].name %>"> \
		<div class="info"> \
			<h3><a href="javascript:void(0)"><%= set[i].name %></a></h3> \
			<p><%= set[i].info %></p> \
		</div> \
	</div> \
<% } %>'

$(document).ready(function(){
    Grid.getImages()
})