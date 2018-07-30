var canvas = $('#example').get(0),
	ctx = canvas.getContext('2d')

canvas.width = 600
canvas.height = canvas.width * .5

var cx = canvas.width * .5,
	cy = canvas.height * .5,
	r = 50,
	fillColor = 'white',
	strokeColor = 'darkorange',
	strokeWidth = 5

ctx.beginPath()
ctx.arc(cx, cy, r, 0, 2 * Math.PI, false)
ctx.fillStyle = 'none'
ctx.fill()
ctx.lineWidth = strokeWidth
ctx.strokeStyle = strokeColor
ctx.stroke()