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
    })

    $(".add").click(function(e){
        removeWidget(this);
    })
});

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
	console.log("data: ", data)
	data.forEach(function(item, i){
		// console.log(item)
		var perfItem = new PerfItem(item)
		perfList.push(perfItem)
	})

//	renderTable()
}


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