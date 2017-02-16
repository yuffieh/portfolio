$('.top').hover(
	function () {
    $(this).children('.display-test').hide();
  },
  function () {
    $(this).children('.display-test').show();
  }

);