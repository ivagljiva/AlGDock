(function(window) {
  var addLigandToLibrary, displaySvg, ligandSearch, molViewDisplay, populateLigands, populateProteins, selectedLigand, selectedProtein;
  selectedProtein = null;
  selectedLigand = null;
  
  // Display the list of proteins that user can select from
  populateProteins = function(proteinJson) {
    proteinJson = JSON.parse(proteinJson);
    console.log(proteinJson.files)
    renderList("proteinScript", {
      "proteinList": proteinJson.files
    });
    
    // Select the protein to dock against, and depending on what it is, display the list of ligand libraries
    // We will change the ligand list to be independent of the selected protein
    $("#proteinScript li a").click(function() {
      selectedProtein = $(this).html();
      $("#proteinDropdownBtn").html(selectedProtein);
      httpGet(restAddr + "/api/v1.0/ligands/" + selectedProtein, populateLigands); // see get_ligand_names() in REST.py
    });
  };
  
  // Display the list of ligand libraries that user can select from
  populateLigands = function(ligandJson) {
    ligandJson = JSON.parse(ligandJson);
    renderList("ligandScript", {
      "ligandList": ligandJson.files
    });
    
    // Select the ligand libraries to dock with
    $("#ligandScript li a").click(function() {
      selectedLigand = $(this).html();
      $("#ligandDropdownBtn").html(selectedLigand);
      httpGet(restAddr + "/api/v1.0/ligandSelection/" + selectedProtein + "/" + selectedLigand, ligandSearch); // see get_ligand_selections(protein, library) in REST.py
    });
  };
  
  // Gets the structure data for a ligand and appends it to the MolView http so that MolView can display it for editing?
  displaySvg = function(htmlLabel) {
    var lineNumber;
    lineNumber = htmlLabel.attr("data-lineNumber");
    // see get_ligand_line(protein, library, lineNumber) in REST.py
    return httpGet(restAddr + "/api/v1.0/ligandLine/" + selectedProtein + "/" + selectedLigand + "/" + lineNumber, function(smiles) {
      smiles = smiles.replace(/\//g, "%2F").replace(/\\/g, "%5c");
      htmlLabel.append('<img style="padding-left: 20px;" src="http://localhost:3000/getSvg/' + lineNumber + '/' + smiles + '" />');
    });
  };
  
  // Displays a ligand in MolView for editing
  molViewDisplay = function() {
    $("#ligandSelectionScript .alert").each(function() {
      displaySvg($(this)); 
      $(this).click(function() {
        var lineNumber;
        lineNumber = $(this).attr("data-lineNumber");
        // see get_ligand_line(protein, library, lineNumber) in REST.py
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
  
  // functionality for addToLibraryBtn that adds a new ligand to a library
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
          // see add_to_library(protein) in REST.py
          httpPost(restAddr + "/api/v1.0/addToLibrary/" + selectedProtein + "/", JSON.stringify(json), displayMessage);
          $("#createLigandLibraryModal").modal('hide');
        };
        reader.readAsText(file);
      }
    }
  };
  
  // Button that adds a ligand to a library
  $("#addToLibraryBtn").click(function() {
    var libraryName;
    libraryName = $("#libraryName").val();
    if (libraryName !== "" && selectedProtein !== null) {
      addLigandToLibrary(libraryName);
    }
  });

  /* Main */
  // The first route called when the selection page is rendered (to display the list of selectable proteins)
  // See get_protein_names() in REST.py
  return httpGet(restAddr + "/api/v1.0/proteins", populateProteins);

})(window);
