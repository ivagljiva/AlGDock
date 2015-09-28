(function(window) {
  var populateLigands, populatePhases, populateProteins, populateProtocols, populateRuntypes, populateSamplers, populateSites;
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
  populateProtocols = function(protocolJson) {
    protocolJson = JSON.parse(protocolJson);
    renderList("protocolScript", {
      "protocolList": protocolJson.protocol
    });
    $("#protocolScript li a").click(function() {
      var selectedProtocol;
      selectedProtocol = $(this).html();
      $("#protocolDropdownBtn").html(selectedProtocol);
    });
  };
  populateSamplers = function(samplerJson) {
    samplerJson = JSON.parse(samplerJson);
    renderList("samplerScript", {
      "samplerList": samplerJson.sampler
    });
    $("#samplerScript li a").click(function() {
      var selectedsampler;
      selectedsampler = $(this).html();
      $("#samplerDropdownBtn").html(selectedsampler);
    });
  };
  populateSites = function(siteJson) {
    siteJson = JSON.parse(siteJson);
    renderList("siteScript", {
      "siteList": siteJson.site
    });
    $("#siteScript li a").click(function() {
      var selectedsite;
      selectedsite = $(this).html();
      $("#siteDropdownBtn").html(selectedsite);
    });
  };
  populatePhases = function(phaseJson) {
    phaseJson = JSON.parse(phaseJson);
    renderList("phaseScript", {
      "phaseList": phaseJson.phase
    });
    $("#phaseScript li a").click(function() {
      var selectedphase;
      selectedphase = $(this).html();
      $("#phaseDropdownBtn").html(selectedphase);
    });
  };
  populateRuntypes = function(runtypeJson) {
    runtypeJson = JSON.parse(runtypeJson);
    renderList("runtypeScript", {
      "runtypeList": runtypeJson.runtype
    });
    $("#runtypeScript li a").click(function() {
      var selectedruntype;
      selectedruntype = $(this).html();
      $("#runtypeDropdownBtn").html(selectedruntype);
    });
  };

  /* Main */
  httpGet("http://127.0.0.1:5000/api/v1.0/proteins", populateProteins);
  httpGet("http://127.0.0.1:5000/api/v1.0/protocols", populateProtocols);
  httpGet("http://127.0.0.1:5000/api/v1.0/samplers", populateSamplers);
  httpGet("http://127.0.0.1:5000/api/v1.0/sites", populateSites);
  httpGet("http://127.0.0.1:5000/api/v1.0/phases", populatePhases);
  httpGet("http://127.0.0.1:5000/api/v1.0/runtype", populateRuntypes);
})(window);
