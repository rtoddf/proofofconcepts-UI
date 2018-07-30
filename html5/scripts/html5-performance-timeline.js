// doWork() // Some developer code
var perfList = []
var isDefined = function(obj){
	return typeof(obj) !== 'undefined' && obj !== null ? obj : ''
}

$(window).load(function() {
	performance.mark('startWork')
	performance.mark('endWork')
    measurePerf()
})

var PerfItem = function(detail, i){
	this.name = isDefined(detail.name).split('/').pop()
	this.type = isDefined(detail.initiatorType)
	this.namePath = isDefined(detail.name)
	this.entryType = isDefined(detail.entryType)
	this.startTime = isDefined(detail.startTime).toFixed(2)
	this.responseStart = isDefined(detail.responseStart)
	this.responseEnd = isDefined(detail.responseEnd)
	this.duration = isDefined(detail.duration).toFixed(2)
}

function measurePerf(){
	var data = performance.getEntries()
	console.log(data)
	data.forEach(function(item, i){
		// console.log(item)
		var perfItem = new PerfItem(item)
		perfList.push(perfItem)
	})

	renderTable()
}

function renderTable(){
	var template_compiled = _.template(template_raw, {
		perfList: perfList
	})

	$('#example').html(template_compiled)
}

var template_raw = '<table class="performance_table"> \
	<tr class="headings"> \
		<th class="">Name</th> \
		<th>Type - Initiator</th> \
		<th>Start Time</th> \
		<th>Duration</th> \
	</tr> \
	<% for (var i = 0; i < perfList.length; i++){ %> \
		<tr class="<%= perfList[i].type %>"> \
			<td><a href="<%= perfList[i].namePath %>" target="_blank"><%= perfList[i].name %></a></td> \
			<td><%= perfList[i].entryType %> (<%= perfList[i].type %>)</td> \
			<td><%= perfList[i].startTime %></td> \
			<td><%= perfList[i].duration %> ms</td> \
		</tr> \
	<% } %> \
</table>'

$('.sorter span').on('click', function(){
	var className = $(this).attr('class').split('_')[1]
	$('.performance_table tr').show()
	$('.performance_table tr:not(".' + className + '")').hide()
	$('.performance_table tr.headings').show()
})