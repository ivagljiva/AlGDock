(function(window) {
  var addLigandToLibrary, displaySvg, ligandSearch, molViewDisplay, populateLigands, populateProteins, selectedLigand, selectedProtein;
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
      httpGet(restAddr + "/api/v1.0/ligands/" + selectedProtein, populateLigands);
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
      httpGet(restAddr + "/api/v1.0/ligandSelection/" + selectedProtein + "/" + selectedLigand, ligandSearch);
    });
  };
  displaySvg = function(htmlLabel) {
    var lineNumber;
    lineNumber = htmlLabel.attr("data-lineNumber");
    return httpGet(restAddr + "/api/v1.0/ligandLine/" + selectedProtein + "/" + selectedLigand + "/" + lineNumber, function(smiles) {
      smiles = smiles.replace(/\//g, "%2F").replace(/\\/g, "%5c");
      htmlLabel.append('<img style="padding-left: 20px;" src="http://localhost:3000/getSvg/' + lineNumber + '/' + smiles + '" />');
    });
  };
  molViewDisplay = function() {
    $("#ligandSelectionScript .alert").each(function() {
      displaySvg($(this));
      $(this).click(function() {
        var lineNumber;
        lineNumber = $(this).attr("data-lineNumber");
        httpGet(restAddr + "/api/v1.0/ligandLine/" + selectedProtein + "/" + selectedLigand + "/" + lineNumber, function(smiles) {
          window.open("http://molview.org/?smiles=" + smiles);
        });
      });
    });
  };
  ligandSearch = function(ligandJson) {
    var ligandSelections;
    ligandJson = JSON.parse(ligandJson);
    ligandSelections = ligandJson.ligandSelections;
    if (ligandSelections != null) {
      toggleEltDisabled("#ligandSearch", false);
      $("#ligandSearch").keyup(function() {
        var enteredText, i, len, ligandId, lineNumber, matchedLigandIds;
        enteredText = $(this).val();
        matchedLigandIds = [];
        for (i = 0, len = ligandSelections.length; i < len; i++) {
          ligandId = ligandSelections[i];
          if (ligandId.indexOf(enteredText) > -1) {
            lineNumber = base10val(ligandId.substring(0, 3)) + 1;
            matchedLigandIds.push({
              "ligand": ligandId + " - " + lineNumber,
              "lineNumber": lineNumber
            });
          }
        }
        if (matchedLigandIds.length > 0) {
          renderList("ligandSelectionScript", {
            "ligandRegex": matchedLigandIds
          });
          toggleEltDisplay("#ligandSelectionPanel", 'show');
          molViewDisplay();
        } else {
          $("#ligandSelectionScript").html('');
          toggleEltDisplay("#ligandSelectionPanel", 'hide');
        }
      });
    } else {
      toggleEltDisabled("#ligandSearch", true);
    }
  };
  addLigandToLibrary = function(libraryName) {
    var file, i, json, len, reader, ref;
    json = {
      "libraryName": libraryName
    };
    ref = document.getElementById('molfile').files;
    for (i = 0, len = ref.length; i < len; i++) {
      file = ref[i];
      if (file) {
        reader = new FileReader();
        reader.onload = function(theFile) {
          var contents, lines, molecule, smiles;
          contents = theFile.target.result;
          lines = contents.split("\n");
          molecule = chem.Molfile.parseCTFile(lines);
          smiles = new chem.SmilesSaver().saveMolecule(molecule);
          json["smiles"] = smiles;
          httpPost(restAddr + "/api/v1.0/addToLibrary/" + selectedProtein + "/", JSON.stringify(json));
        };
        reader.readAsText(file);
      }
    }
  };
  $("#addToLibraryBtn").click(function() {
    var libraryName;
    libraryName = $("#libraryName").val();
    if (libraryName !== "" && selectedProtein !== null) {
      addLigandToLibrary(libraryName);
    }
  });

  /* Main */
  return httpGet(restAddr + "/api/v1.0/proteins", populateProteins);
})(window);
