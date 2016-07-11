// Source code for buttons on login.hjs page

$(document).ready(function(){
    $("#login_btn").click(function(){
          $("#reg_form").slideUp();
          $("#login_form").slideDown();
	  $("#info_panel").slideUp();
	  $("#login_btn").addClass("grey-col");
	  $("#reg_btn").removeClass("grey-col");
    })
    $("#reg_btn").click(function() {
          $("#login_form").slideUp();
          $("#reg_form").slideDown();
	  $("#info_panel").slideDown();
	  $("#reg_btn").addClass("grey-col");
	  $("#login_btn").removeClass("grey-col");
    })
    $("#login_mail").bind('focus focusout', function(){
          $("#envelope").toggleClass("blue-iconCol");
    })
    $("#login_pass").bind('focus focusout', function(){
          $("#lock").toggleClass("blue-iconCol");
    })
    $('[name="reg_mail"]').bind('focus', function(){
          $("#reg_envelope").toggleClass("blue-iconCol");
    })
    // Check whether email is valid IIT student or faculty email account
    $('[name="reg_mail"]').bind('focusout', function(){
        $("#reg_envelope").toggleClass("blue-iconCol");
	var email = $('[name="reg_mail"').val();
        var isStud = /\w+@hawk.iit.edu/.test(email);
        var isStaff = /\w+@iit.edu/.test(email);
        if(isStud){
            $('#stud').slideDown();
            $('#invalid').slideUp();
            $('#staff').slideUp();
        }
        else if(isStaff){
            $('#staff').slideDown();
            $('#invalid').slideUp();
            $('#stud').slideUp();
        }
        else{
            $('#staff').slideUp();
            $('#invalid').slideDown();
            $('#stud').slideUp();
        }
    })
	// Check whether password is strong enough
    $('[name="reg_pass1"]').keyup(function(){
      var password = $('[name="reg_pass1"]').val();
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

    $('[name="reg_pass1"]').bind('focus focusout', function(){
          $("#reg_lock1").toggleClass("blue-iconCol");
    })
    $('[name="reg_pass2"]').bind('focus focusout', function(){
          $("#reg_lock2").toggleClass("blue-iconCol");
    })
    $('[name="reg_pass2"]').keyup(function(){
	var pass1 = $('[name="reg_pass1"]').val();
	var pass2 = $('[name="reg_pass2"]').val();
	var mail = $('[name="reg_email"').val();
	if(pass1 !== pass2){
	    $('#confpass_bad').show();
	    $('#confpass_ok').hide();
	} else {
	    $('#confpass_ok').show();
	    $('#confpass_bad').hide();
	}
    })
	// Submit button for registration. Does not allow registration if email or password are invalid or password/confirm password not matching
    $('#reg_form').submit(function(e){
      if($('#confpass_bad').is(':visible') || $('#pass_bad').is(':visible') || $('[name="reg_email"]').val() === "" || $('#invalid').is(':visible'))
        e.preventDefault();
    })
});
