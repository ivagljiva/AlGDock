(function(window) {
  var displayMessage;
  displayMessage = function(message) {
    alert(message);
  };

  /* Listeners */
  $("#runBtn").click(function() {
    var selectedLigand, selectedProtein;
    selectedProtein = $("#proteinDropdownBtn").html();
    selectedLigand = $("#ligandDropdownBtn").html();
    if (selectedProtein !== "Select Protein" && selectedLigand !== "Select Ligand(s)") {
      httpGet("http://127.0.0.1:5000/api/v1.0/run/" + selectedProtein + "/" + selectedLigand, displayMessage);
    }
  });
})(window);
