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
          httpPost(restAddr + "/api/v1.0/addToLibrary/" + selectedProtein + "/", JSON.stringify(json), displayMessage);
          $("#createLigandLibraryModal").modal('hide');
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
  // return httpGet(restAddr + "/api/v1.0/proteins", populateProteins);


  //data for /selection page

  //foo data
  var rowsProtein = [{
          name: "protein1"
      }, {
          name: "protein2",
      }, {
          name: "protein3"
      }];

      var html = "<table border='1|1'> <thead> <tr>";
      html+="<th></th>";
      html+="<th data-sort='string'>Name</th>";
      html+="</tr> </thead> <tbody>";
      for (var i = 0; i < rowsProtein.length; i++) {
          html+="<tr>";
          html+="<td> <input type='checkbox' /></td>"
          html+="<td>"+rowsProtein[i].name+"</td>";
          html+="</tr>";
      }
      html+="</tbody> </table>";
      $("#tableProtein").html(html);
      $("#tableProtein").stupidtable();

  $("#saveProteins").click(function() {
    if($("#tableProtein input:checked").length > 0){       //If there's at least one checklist checked
      var html= "Protein(s) Selected:";
      $('#tableProtein tbody tr').each(function() {        //See which one is checked and add the name
          var checked = $(this).find("input").is(":checked");
          var name = $(this).find("td").eq(1).html();
          html += checked ? "<br>"+name : "";
      });
      $("#btnSelectProtein").html(html);
    }else{
      $("#btnSelectProtein").html("Select protein(s)");
    }
  });

  //foo data
  var rowsLigand = [{
          name: "ligand1"
      }, {
          name: "ligand2",
      }, {
          name: "ligand3"
      }];

      var html = "<table border='1|1'> <thead> <tr>";
      html+="<th></th>";
      html+="<th data-sort='string'>Name</th>";
      html+="</tr> </thead> <tbody>";
      for (var i = 0; i < rowsLigand.length; i++) {
          html+="<tr>";
          html+="<td> <input type='checkbox' /></td>"
          html+="<td>"+rowsLigand[i].name+"</td>";
          html+="</tr>";
      }
      html+="</tbody> </table>";
      $("#tableLigand").html(html);
      $("#tableLigand").stupidtable();

  $("#saveLigands").click(function() {
    if($("#tableLigand input:checked").length > 0){       //If there's at least one checklist checked
      var html= "Ligand(s) Selected:";
      $('#tableLigand tbody tr').each(function() {        //See which one is checked and add the name
          var checked = $(this).find("input").is(":checked");
          var name = $(this).find("td").eq(1).html();
          html += checked ? "<br>"+name : "";
      });
      $("#btnSelectLigand").html(html);
    }else{
      $("#btnSelectLigand").html("Select ligand(s)");
    }
  });

})(window);
