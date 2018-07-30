var stringOne, stringTwo

$('.check').on('click', function(){
    if($('#string1').val() != '' && $('#string2').val() != ''){
        stringOne = $('#string1').val()
        stringTwo = $('#string2').val()

        console.log('stringOne: ', stringOne)
        console.log('stringTwo: ', stringTwo)

        checkForAnagram(stringOne, stringTwo)
    } else {
        $('.response').html('You must enter two strings')
    }   
})

$('.reset').on('click', function(){
    $('#string1').val('')
    $('#string2').val('')
    stringOne = ''
    stringTwo = ''
})

function checkForAnagram(str1, str2){
    s1 = str1.replace(/ /g, '').split('')
    s2 = str2.replace(/ /g, '').split('')

    if(s1.length == s2.length){
        if(s1.sort().join(',') == s2.sort().join(',')){
            $('.response').html('The two strings are anagrams of each other.')
        } else {
            $('.response').html('The two strings are not anagrams of each other.')
        }
    } else {
        $('.response').html('The two strings are not equal in length. There is no way they can be anagrams.')
    }
}

// var stringOne = 'desperation'
// var stringTwo = 'a rope ends it'