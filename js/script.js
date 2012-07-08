$(document).ready(function() {

var showing = false;
$('.rel-toggle').click(function() {
	if (showing) {
		$(this).html('Relevant Coursework');
		$('.irrelevant').slideUp().addClass('hide');
	} else {
		$(this).html('All Coursework');
		$('.irrelevant').slideDown().removeClass('hide');
	}
	showing = !showing;
});

var winWidthOffset = $(document).width()/2;
var winCenterX = $(document).width()/2;
var winCenterY = $(window).height();

var front = $('.mt-front');
var mid = $('.mt-mid');
var back = $('.mt-back');
var mountainX = function(offset) {
	front.css('left', -offset/50-winWidthOffset);
	mid.css('left', -offset/100-winWidthOffset);
	back.css('left', -offset/200-winWidthOffset);
};
var mountainY = function(offset) {
	front.css('bottom', offset/50-10);
	mid.css('bottom', offset/100-10);
	back.css('bottom', -offset/400);
};

$('body').mousemove(function(e) {
	mountainX(e.clientX - winCenterX);
	mountainY(e.clientY - winCenterY);
});

});