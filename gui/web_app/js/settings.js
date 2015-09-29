(function(window) {
  var ligandSearch, populateLigands, populatePhases, populateProteins, populateProtocols, populateRuntypes, populateSamplers, populateSites, selectedLigand, selectedProtein;
  selectedProtein = null;
  selectedLigand = null;
  populateProteins = function(proteinJson) {
    proteinJson = JSON.parse(proteinJson);
    renderList("proteinScript", {
      "proteinList": proteinJson.files
    });
    $("#proteinScript li a").click(function() {
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
      selectedLigand = $(this).html();
      $("#ligandDropdownBtn").html(selectedLigand);
      httpGet("http://127.0.0.1:5000/api/v1.0/ligandSelection/" + selectedProtein + "/" + selectedLigand, ligandSearch);
    });
  };
  ligandSearch = function(ligandJson) {
    var ligandSelections;
    ligandJson = JSON.parse(ligandJson);
    ligandSelections = ligandJson.ligandSelections;
    if (ligandSelections != null) {
      toggleEltDisabled("#ligandSearch", false);
      $("#ligandSearch").keyup(function() {
        var enteredText, ligandId, matchedLigandIds;
        enteredText = $(this).val();
        matchedLigandIds = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = ligandSelections.length; i < len; i++) {
            ligandId = ligandSelections[i];
            if (ligandId.startsWith(enteredText)) {
              results.push({
                "ligand": ligandId
              });
            }
          }
          return results;
        })();
        if (matchedLigandIds.length > 0) {
          renderList("ligandSelectionScript", {
            "ligandRegex": matchedLigandIds
          });
          toggleEltDisplay("#ligandSelectionPanel", 'show');
        } else {
          $("#ligandSelectionScript").html('');
          toggleEltDisplay("#ligandSelectionPanel", 'hide');
        }
      });
    } else {
      toggleEltDisabled("#ligandSearch", true);
    }
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
  httpGet("http://127.0.0.1:5000/api/v1.0/runtypes", populateRuntypes);
})(window);
