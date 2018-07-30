$(document).ready(function(){
    $('#columnSelect').change(function(){
        var columnCount = $('#columnSelect :selected')[0].value
        $('.grid').attr('data-column-count', columnCount)

        $('.columnnn').each(function(i, col){
            if($(col).attr('data-column') > columnCount){
                $(col).hide();
            } else {
                $(col).show();
            }
        })
    })
})
