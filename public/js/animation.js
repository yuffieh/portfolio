$(document).ready(function(){
	$('#hamburger').click(function(){
	    $('#mylinks, #hamburger').toggleClass('open');
	});
});


var particles = [];

var dots = Math.floor(window.innerWidth/7);

for( var i = 0; i < dots; i++ ) {
	particles.push( {
		x:Math.random()*window.innerWidth,
		y:Math.random()*window.innerHeight,
		vx:0,
		vy:-1*Math.random()-Math.random()-0.05,
		history: [],
		size: 2,
		color: "white"
	} );
}

var mouse = { x: 0, y: 0 };

var canvas = document.getElementById('canvasElement');

var points = [],
	width = canvas.width,
	height = canvas.height;

var MAX_DIST_2 = 100*100;
var circRadius = 4;//pix

if (canvas && canvas.getContext) {
	var context = canvas.getContext('2d');
	Initialize();
}

function Initialize() {
	canvas.addEventListener('mousemove', MouseMove, false);
	window.addEventListener('resize', ResizeCanvas, false);
	setInterval( TimeUpdate, 20 );
	context.beginPath();
	ResizeCanvas();
}

function TimeUpdate(e) {

	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	var point, i, j, ptCons = new Array(points.length);

	for(i = 0; i < particles.length; i++)
	{
		ptCons[i] = new Array(particles.length);

		for(j = 0; j < particles.length; j++)
		{
			ptCons[i][j] = 0;
		}
	}

	for( var i = 0; i < particles.length; i++ ) {

		particles[i].x += particles[i].vx;
		particles[i].y += particles[i].vy;

		if( particles[i].x > window.innerWidth ) {
			particles[i].vx = -1-Math.random();
		}
		else if ( particles[i].x < 0 ) {
			particles[i].vx = 1+Math.random();
		}
		else {
			particles[i].vx *= 1 + (Math.random()*0.005);
		}

		if( particles[i].y > window.innerHeight ) {
			particles[i].vy = -1-Math.random();
		}
		else if ( particles[i].y < 0 ) {
			particles[i].y = window.innerHeight;
			particles[i].vy = 1;
		}
		else {
			particles[i].vy *= 1;
		}

		context.strokeStyle = particles[i].color;
		context.beginPath();

		var min_dist_2 = MAX_DIST_2;

		particles.forEach(function(pt, j){
			var dist_2 = (Math.pow(pt.x - particles[i].x, 2) + Math.pow(pt.y - particles[i].y, 2));

			if(dist_2 < min_dist_2 && pt != particles[i])
				min_dist_2 = dist_2;

			if(pt == particles[i] || dist_2 > MAX_DIST_2 || ptCons[i][j])
				return;

			context.moveTo(particles[i].x, particles[i].y);
			var dirx = particles[i].x > pt.x ? particles[i].x : pt.x;
			var diry = particles[i].y < pt.y ? particles[i].y : pt.y;
			context.quadraticCurveTo(dirx, diry, pt.x, pt.y);
			context.strokeStyle = 'rgba(255,255,255,' + (1 - dist_2 / MAX_DIST_2) +' )'
			ptCons[i][j] = 1;
			ptCons[j][i] = 1;
		});
		

		var distanceFactor = DistanceBetween( mouse, particles[i] );
		distanceFactor = Math.max( Math.min( 15 - ( distanceFactor / 10 ), 10 ), 1 );
		
		if(distanceFactor > 7){
			context.stroke();
		}

		context.fillStyle = particles[i].color;
		context.beginPath();
		context.arc(particles[i].x,particles[i].y,particles[i].size,0,Math.PI*2,true);
		context.closePath();
		context.fill();

	}
}

function MouseMove(e) {
	mouse.x = e.layerX;
	mouse.y = e.layerY;
}



function ResizeCanvas(e) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function DistanceBetween(p1,p2) {
	var dx = p2.x-p1.x;
	var dy = p2.y-p1.y;
	return Math.sqrt(dx*dx + dy*dy);
}

(function ($) {
// VERTICALLY ALIGN FUNCTION
$.fn.vAlign = function() {
    return this.each(function(i){
    var ah = $(this).height();
    var ph = $(this).parent().height();
    var mh = Math.ceil((ph-ah) / 2);
    $(this).css('margin-top', mh);
    });
};
})(jQuery);

var body = document.body,
    timer;

window.addEventListener('scroll', function() {
  clearTimeout(timer);
  if(!body.classList.contains('disable-hover')) {
    body.classList.add('disable-hover')
  }

  timer = setTimeout(function(){
    body.classList.remove('disable-hover')
  },500);
}, false);

function scrollToElement(selector, time, verticalOffset) {
    time = typeof(time) != 'undefined' ? time : 1000;
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $(selector);
    offset = element.offset();
    offsetTop = offset.top + verticalOffset;
    $('html, body').animate({
        scrollTop: offsetTop
    }, time);
}

$(document).ready(function() {

//    var header = $('nav.main').offset().top;
	var $canvas = $('#canvasElement');
	$(window).bind('scroll', function(){
	var pos = $canvas.offset();
	   var wndtop = $(this).scrollTop();
		var h = $(window).height();
	   if(wndtop > h) {
	      $canvas.fadeOut();
		}
		if(wndtop <= (h/2)) {
	      $canvas.fadeIn();
		}
	});
});
