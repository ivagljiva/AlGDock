// Source code for footer.hjs - this file really should be renamed
// Defines functions for the buttons in the footer

//Pedro's Stuff

$(document).ready(function(){
	$("#aboutTab").click(function() {
	    document.getElementById("aboutTab").className="active";
	  });
	$("#homeTab").click(function() {
	    document.getElementById("homeTab").className="active";
	});
	$("#protTab").click(function() {
	    document.getElementById("protTab").className="active";
	});
	$("#ligTab").click(function() {
	    document.getElementById("ligTab").className="active";
	});
	$("#jobsTab").click(function() {
	    document.getElementById("jobsTab").className="active";
	});
});