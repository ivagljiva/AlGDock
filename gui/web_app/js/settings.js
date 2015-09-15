(function(window) {
  var populateLigands, populateProteins;
  populateProteins = function(proteinJson) {
    proteinJson = JSON.parse(proteinJson);
    renderList("proteinScript", {
      "proteinList": proteinJson.files
    });
    $("#proteinScript li a").click(function() {
      var selectedProtein;
      selectedProtein = $(this).html();
      $("#proteinDropdownBtn").html(selectedProtein);
      httpGet("http://127.0.0.1:5000/api/v1.0/ligands/" + selectedProtein, populateLigands);
    });
  };
  populateLigands = function(ligandJson) {
    ligandJson = JSON.parse(ligandJson);
    renderList("ligandScript", {
      "ligandList": ligandJson.files
    });
    $("#ligandScript li a").click(function() {
      var selectedLigand;
      selectedLigand = $(this).html();
      $("#ligandDropdownBtn").html(selectedLigand);
    });
  };

  /* Main */
  httpGet("http://127.0.0.1:5000/api/v1.0/proteins", populateProteins);
})(window);
