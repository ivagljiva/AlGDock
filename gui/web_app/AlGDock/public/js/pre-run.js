(function(window) {
	onclick="location.href='pageurl.html';"
  $("#runlh").onclick="/jobs";
  $("#runucf").click(function() {
  	alert("FLWS");
  	//httpGet(restAddr + "/api/v1.0/run/" + selectedProtein + "/" + selectedLigand + "/" + user, function() {
        // window.open("/jobs");
        //});
  	window.open("/jobs");
  });
})(window);