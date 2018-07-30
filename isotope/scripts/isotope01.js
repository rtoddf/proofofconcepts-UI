var photo_limit = 12

$(document).ready(function() {
    // var template = _.template(template_raw, {})
    // $('.isotope_container').html(template)

    set_isotope()
})

function set_isotope(){
    $('.isotope_container').isotope({
        masonryHorizontal: {
            rowHeight: 100
        }
    })
    
    $('.sort').on('click', function(){
        var category = $(this).data('category')
        $('.isotope_container').isotope({
            filter: category
        })
    })
}

var template_raw = '<% for(var i=0; i<photo_limit; i++){ %> \
    <div class="col-md-3 element"><img src="images/people/athlete/tom_daley.jpg"></div> \
<% } %>'