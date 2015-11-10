(function(window) {
  var populatePhases, populateProtocols, populateRuntypes, populateSamplers, populateSites;
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
  httpGet(restAddr + "/api/v1.0/protocols", populateProtocols);
  httpGet(restAddr + "/api/v1.0/samplers", populateSamplers);
  httpGet(restAddr + "/api/v1.0/sites", populateSites);
  httpGet(restAddr + "/api/v1.0/phases", populatePhases);
  httpGet(restAddr + "/api/v1.0/runtypes", populateRuntypes);
})(window);
