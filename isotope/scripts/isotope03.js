var $container = $('.isotope_container');

var isDefined = function(obj){
    return typeof(obj) !== 'undefined' && obj !== null ? obj : ''
}

var Photos = function(name, photos){
    this.name = isDefined(name)
    this.photos = isDefined(photos)
}

var People = new function(){
    this.get = function(){
        photoCollection = []

        $.getJSON('../data/instagram.json', function(data){
            for(var key in data) {
                var photos = new Photos(key, data[key].photos)
                photoCollection.push(photos)
            }

            console.log('photoCollection: ', photoCollection)
            People.renderTemplate(photoCollection)
        })
    }

    this.renderTemplate = function(pc){
        var template = _.template(template_raw, {
            data: pc
        })
        $container.html(template)

        People.setUpIsotope()
    }

    this.setUpIsotope = function(){
        $container.delegate('.element', 'click', function(){
            if(!$(this).hasClass('enlarged')){
                $(this).animate({
                    width: 350,
                    height: 350
                }, 300, function(){
                    $container.isotope('reLayout');
                    $(this).addClass('enlarged');
                })
            } else {
                $(this).animate({
                    width: 110,
                    height: 110
                }, 300, function(){
                    $container.isotope('reLayout');
                    $(this).removeClass('enlarged');
                })
            }
            
        });

        $container.isotope({
            itemSelector: '.element',
                masonryHorizontal: {
                rowHeight: 100
            }
        });

        $container.delegate('.element', 'click', function(){
            $(this).toggleClass('front');
            $container.isotope('reLayout');
        });

        $('.element').on('click', function(){
            $(this).toggleClass('front');
            $container.isotope('reLayout');
        })
    }
}

People.get()

var template_raw = '<% console.log("bob") %> \
<% for(var i=0; i<data.length; i++){ %> \
    <div class="element" data-category="<%= data[i].type %>"> \
        <img src="<%= data[i].photos["photo0"].low_resolution %>" alt="<%= data[i].name %>" title="<%= data[i].name %>"> \
    </div> \
<% } %>'
