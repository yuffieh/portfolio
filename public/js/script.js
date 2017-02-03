var num = 705
var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop && num > 0){
		num -= 5; //downScroll

   } else {
      num = 705; //upScroll
   }
   lastScrollTop = st;
});


function nextMsg() {
    if (messages.length == 0) {
        messages = [
    "web dev",
    "actor",
    "animal lover",
    "javascript is weird"
].reverse();
nextMsg();
    } else {
	    console.log(messages);
        // change content of message, fade in, wait, fade out and continue with next message
        $('.who').html(messages.pop()).fadeIn(500).delay(1000).fadeOut(500, nextMsg);
    }
};
// list of messages to display
var messages = [
     "web dev",
    "actor",
    "animal lover",
    "javascript is weird"
].reverse();

// initially hide the message
$('.who').hide();

// start animation
nextMsg();
