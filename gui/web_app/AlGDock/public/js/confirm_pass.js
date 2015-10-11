$(document).ready(function(){
    $('[name="new_password"]').keyup(function(){
      var password = $('[name="new_password"]').val();
      var hasUpperCase = /[A-Z]/.test(password);
      var hasLowerCase = /[a-z]/.test(password);
      var hasNumbers = /\d/.test(password);
      var hasNonalphas = /\W/.test(password);
      if (!hasUpperCase)
        $('#pass_up').slideDown();
      else
        $('#pass_up').slideUp();
      if (!hasNumbers)
        $('#pass_num').slideDown();
      else
        $('#pass_num').slideUp();
      if (!hasNonalphas)
        $('#pass_special').slideDown();
      else
        $('#pass_special').slideUp();
      if (password.length < 6)
        $('#pass_long').slideDown();
      else
        $('#pass_long').slideUp();
      if (hasUpperCase + hasNumbers + hasNonalphas == 3 && password.length >= 6){
        $('#pass_ok').show();
        $('#pass_bad').hide();
      }
      else{
          $('#pass_bad').show();
	  $('#pass_ok').hide();
      }
    });


    $('[name="new_password"]').bind('focus focusout', function(){
        $('[name="second_pass"]').toggleClass("blue-iconCol");
    })
    $('[name="confirmed_new_password"]').bind('focus focusout', function(){
        $('[name="second_pass1"]').toggleClass("blue-iconCol");
    })
    $('[name="confirmed_new_password"]').keyup(function(){
	var pass1 = $('[name="new_password"]').val();
	var pass2 = $('[name="confirmed_new_password"]').val();
	if(pass1 !== pass2){
	    $('#confpass_bad').show();
	    $('#confpass_ok').hide();
	} else {
	    $('#confpass_ok').show();
	    $('#confpass_bad').hide();
	}
    })

    $('#change_form').submit(function(e){
      if($('#confpass_bad').is(':visible') || $('#pass_bad').is(':visible'))
        e.preventDefault();
    })

});
