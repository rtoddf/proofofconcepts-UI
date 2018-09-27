var perfList = []
var isDefined = function(obj){
	return typeof(obj) !== 'undefined' && obj !== null ? obj : ''
}

var out = false;
var src;

$(document).ready(function() {
	performance.mark('startWork');
	performance.mark('endWork');
    measurePerf();
	
	$("#tab").on("click", function(){
		inOut();
    });
    
    $("#screenshotButton").click(function(){
        takeScreenShot();
    });

    $("#swingOpenButton").click(function(){
        openSwing();
    });

    $(".remove").click(function(e){
        removeWidget(this);
    });

    $(".add").click(function(e){
        removeWidget(this);
	});
	
	$("#clipboardButton").click(function(){
        copyToClipboard();
    });
});

function copyToClipboard(){
    var text = $(".clipboard-text").text();

    // Create the textarea input to hold our text.
    const element = document.createElement('textarea');
    element.value = text;
    // Add it to the document so that it can be focused.
    document.body.appendChild(element);
    // Focus on the element so that it can be copied.
    element.focus();
    element.setSelectionRange(0, element.value.length);
    // Execute the copy command.
    document.execCommand('copy');
    // Remove the element to keep the document clear.
    document.body.removeChild(element);
}

function inOut(){
	console.log("click");
	if(!out){
		$("#swingr-window").removeClass("in");
		$("#swingr-window").addClass("out");
		out = true;
	} else {
		$("#swingr-window").removeClass("out");
		$("#swingr-window").addClass("in");
		out = false;
	}
	
}

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
	
	data.forEach(function(item, i){
		var perfItem = new PerfItem(item)
		
		if(perfItem.type == "script"){
			perfList.push(perfItem)
		}
	})

	renderTable()
}

function renderTable(){
	var template_compiled = _.template(template_raw, {
		perfList: perfList
	})
	$('#scripts').html(template_compiled)

	console.log("template_compiled: ", template_compiled)
}

var template_raw = '<table class="performance_table"> \
	<tr> \
		<th  class="scripts-heading">Script</th> \
		<th>Start Time</th> \
		<th>Duration</th> \
	</tr> \
	<% for (var i = 0; i < perfList.length; i++){ %> \
		<tr class="<%= perfList[i].type %>"> \
			<td><%= perfList[i].name %></td> \
			<td><%= perfList[i].startTime %></td> \
			<td><%= perfList[i].duration %> ms</td> \
		</tr> \
	<% } %> \
</table>'


/* then use the canvas 2D drawing functions to add text, etc. for the result */

function takeScreenShot(){
    console.log("take screenshot: ")
    // window.open('', document.getElementById('story').toDataURL());
}

function openSwing(){
    console.log("open Swing: ")
    // window.open('', document.getElementById('story').toDataURL());
}

function openSwing(){
    console.log("open Swing: ")
    // window.open('', document.getElementById('story').toDataURL());
}

function removeWidget(elem){
    if($(elem).hasClass("remove")){
        $(elem).closest(".module").find(".bar").css("display", "none");
    } else {
        $(elem).closest(".module").find(".bar").css("display", "block");
    }

    // $(elem).closest(".module").find(".bar").css("display", "none");

    $(elem).addClass("hide");
    $(elem).siblings().removeClass("hide");
}


