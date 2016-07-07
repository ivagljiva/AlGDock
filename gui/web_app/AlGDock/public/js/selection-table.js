(function(window) {
  //foo data
  var addLigandToLibrary, displaySvg, ligandSearch, molViewDisplay, populateLigands, populateProteins, selectedLigand, selectedProtein, proteins, ligands, populateProteinTable, populateLigandTable;

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

      alert("AQII");
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
  }

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