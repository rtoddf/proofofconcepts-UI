// http://www.tutorialspoint.com/javascript/javascript_date_object.htm

// set global vars
var monthChoice, yearChoice

// set arrays of months, days per months, and weekdays
var months = new Array('January',' February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December') 
var monthDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
var weekDay = new Array('S', 'M', 'T', 'W', 'T', 'F', 'S')

$('.choose').bind('click', function(){
    monthChoice = $('#monthChoice :selected')[0].value
    yearChoice = $('#yearChoice :selected')[0].value
    Calendar.getData(monthChoice, yearChoice, 1)
})

var dateToday = new Date()
var dayToday = dateToday.getDate()
var monthToday = dateToday.getMonth()
var yearToday = dateToday.getFullYear()
var dateTodayMonthYear = monthToday + '/' + yearToday

$( document ).ready(function() {
    Calendar.getData(monthToday, yearToday, dayToday)
})

var Calendar = new function(){
    var date, day, month, year, daysInMonth, firstWeekDay, dateMonthYear
    this.getData = function(m, y, d){
        date = new Date(y, m, d)
        day = date.getDate()
        month = date.getMonth()
        year = date.getFullYear()
        daysInMonth = monthDays[month]
        firstWeekDay = new Date(year, month, 1).getDay()
        dateMonthYear = month + '/' + year
        Calendar.render()
        // Calendar.getBirthdays()
    }

    // this.getBirthdays = function(){
    //     $.getJSON('../data/senators.json', function(data){
    //         console.log('data: ', data)
    //         $.each(data, function(i, pol){
    //             var birthday = (pol.personal[0].birthdate).split(' ')
    //             // console.log('birthday: ', birthday)
    //             var birthdayMonth = birthday[0]
    //             var test = months.indexOf(birthdayMonth)
    //             // console.log('test: ', test)
    //             // console.log('month: ', month)
    //             if(test == month){
    //                 console.log(data[i].name + ' has a birthday in ' + birthdayMonth)
    //             }
                
    //             // console.log('birthday: ', birthday)
    //         })
    //     })
    // }

    this.render = function(){
        $('#calendar').html('')

        function closeRow(){
            return calendarHtml += '</tr><tr>'
        }

        var calendarHtml = '<h4 class="calendar_heading">' + months[month] + ' ' + year +' </h4>'
        calendarHtml += '<table class="calendarTable">'

        for(weekday = 0; weekday < 7; weekday++){
            calendarHtml += '<td>' + weekDay[weekday] + '</td>'
        }

        closeRow()

        for(weekday = 0; weekday < firstWeekDay; weekday++){
            calendarHtml += '<td>&nbsp;</td>'
        }

        weekday = firstWeekDay
        for(daycounter = 1; daycounter <= daysInMonth; daycounter++){
            // look up %=
            weekday %= 7
            if(weekday == 0)
                closeRow()

            if(day == daycounter){
                if(dateTodayMonthYear == dateMonthYear){
                    calendarHtml += '<td class="today">' + daycounter + '</td>'
                } else {
                    calendarHtml += '<td>' + daycounter + '</td>'
                }
                
            } else {
                calendarHtml += '<td date-type="birthday">' + daycounter + '</td>'
            }

            weekday++
        }

        calendarHtml += '</tr></table>'
        $('#calendar').html(calendarHtml)
    }
}
