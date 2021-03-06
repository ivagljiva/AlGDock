// Source code for the selection modules on selection.hjs

(function(window) {
  //foo data
  var addLigandToLibrary, displaySvg, ligandSearch, molViewDisplay, populateLigands, populateProteins, selectedLigand, selectedProtein, proteins, ligands, populateProteinTable, populateLigandTable, 
  selectedLigands=[], selectedProteins=[]; //for temp run button

  populateProteins = function(proteinJson){
    proteinJson = JSON.parse(proteinJson);
    populateProteinTable(proteinJson.files);
  }

  populateLigands = function(ligandJson){
    ligandJson = JSON.parse(ligandJson);
    populateLigandTable(ligandJson.files);
  }

  httpGet(restAddr + "/api/v1.0/ligands", populateLigands)
  httpGet(restAddr + "/api/v1.0/proteins", populateProteins)



  // $("btnSelectProtein").click(function(){
  //     httpGet(restAddr + "/api/v1.0/proteins", populateProteins)
  // })
  //
  // $("btnSelectLigand").click(function(){
  //     httpGet(restAddr + "/api/v1.0/ligands", populateLigands)
  // })

  populateProteinTable = function(proteins){
      var html = "<table border='1|1'> <thead> <tr>";
      html+="<th></th>";
      html+="<th data-sort='string'>Name</th>";
      html+="</tr> </thead> <tbody>";
      for (var i = 0; i < proteins.length; i++) {
          var protein = proteins[i];
          console.log(protein);
          html+="<tr>";
          html+="<td> <input type='checkbox' /></td>"
          html+="<td>"+protein.filename+"</td>";
          html+="</tr>";
      }
      html+="</tbody> </table>";
      $("#tableProtein").html(html);
      $("#tableProtein").stupidtable();

    $("#saveProteins").click(function() {
      console.log("Saving proteins");
      if($("#tableProtein input:checked").length > 0){       //If there's at least one checklist checked
        var html= "Protein(s) Selected:";
        $('#tableProtein tbody tr').each(function() {        //See which one is checked and add the name
            var checked = $(this).find("input").is(":checked");
            var name = $(this).find("td").eq(1).html();
            if(checked){
              html += "<br>"+name;
              selectedProteins.push(name);
}
        });
        $("#btnSelectProtein").html(html);	//add the selected proteins to the button text
      }else{
        $("#btnSelectProtein").html("Select protein(s)");
      }
    });

    $("#searchUniprot").click(function(){
      window.open("http://www.uniprot.org/");
    });
  }

  /*$("#createProtein").click(function() {
    if($("#tableProtein input:checked").length==0){
        alert("Please select the ligand that you want to edit");
      }
      if($("#tableProtein input:checked").length>1){
        alert("Only one ligand can be edited at a time");
      }
      if($("#tableProtein input:checked").length==1){
        
      }
  });*/

  populateLigandTable = function(ligands){

      var html = "<table border='1|1'> <thead> <tr>";
      html+="<th></th>";
      html+="<th data-sort='string'>Name</th>";
      html+="</tr> </thead> <tbody>";
      for (var i = 0; i < ligands.length; i++) {
          var ligand = ligands[i];
          console.log(ligand);
          html+="<tr>";
          html+="<td> <input type='checkbox' /></td>"
          html+="<td>"+ligand.filename+"</td>";
          html+="</tr>";
      }
      html+="</tbody> </table>";
      $("#tableLigand").html(html);
      $("#tableLigand").stupidtable();

    /*$("#editLigand").click(function() {
      if($("#tableLigand input:checked").length==0){
        alert("Please select the ligand that you want to edit");
      }
      if($("#tableLigand input:checked").length>1){
        alert("Only one ligand can be edited at a time");
      }
      if($("#tableLigand input:checked").length==1){
        alert("Only one ligand can be edited at a time");
      }
    });*/

    $("#saveLigands").click(function() {
		console.log('Saving ligands');
      //alert("AQII"); //opens a useless alert popup
      if($("#tableLigand input:checked").length > 0){       //If there's at least one checklist checked
        var html= "Ligand(s) Selected:";
        $('#tableLigand tbody tr').each(function() {        //See which one is checked and add the name
            var checked = $(this).find("input").is(":checked");
            var name = $(this).find("td").eq(1).html();
            if(checked){
              html += "<br>"+name;
              selectedLigands.push(name);
}
        });
        $("#btnSelectLigand").html(html); 	//add the selected ligands to the button text
      }else{
        $("#btnSelectLigand").html("Select ligand(s)");
      }
    });
  }
// temp run button
  $("#btnRun").click(function() { //TODO: validation for this button
    var email = document.cookie.split(';')[1].split('=')[1];
    for(i=0; i<selectedProteins.length; i++){
      for(j=0; j<selectedLigands.length; j++){
        console.log(selectedProteins[i]+" "+selectedLigands[j]+" "+email);
        httpGet(restAddr + "/api/v1.0/run/" + selectedProteins[i] + "/" + selectedLigands[j] + "/" + email, displayMessage);
      }
    }
});

})(window);

//table selection look and behavior

var check = true;

function checkAll() {
    if (check == true){
    	$(':checkbox').prop('checked', true);
    	check = false;
    }else if (check == false){
    	$(':checkbox').prop('checked', false);
    	check = true;
    }
}