((window) ->
  selectedProtein = null
  selectedLigand = null

  populateProteins = (proteinJson) ->
    proteinJson = JSON.parse proteinJson
    renderList "proteinScript", {"proteinList": proteinJson.files}

    $("#proteinScript li a").click () ->
      selectedProtein = $(this).html()
      $("#proteinDropdownBtn").html selectedProtein
      httpGet("#{restAddr}/api/v1.0/ligands/#{selectedProtein}", populateLigands)
      return
    return

  populateLigands = (ligandJson) ->
    ligandJson = JSON.parse ligandJson
    renderList "ligandScript", {"ligandList": ligandJson.files}

    $("#ligandScript li a").click () ->
      selectedLigand = $(this).html()
      $("#ligandDropdownBtn").html selectedLigand
      httpGet("#{restAddr}/api/v1.0/ligandSelection/#{selectedProtein}/#{selectedLigand}", ligandSearch)
      return
    return

  displaySvg = (htmlLabel) ->
    lineNumber = htmlLabel.attr("data-lineNumber")
    httpGet "#{restAddr}/api/v1.0/ligandLine/#{selectedProtein}/#{selectedLigand}/#{lineNumber}", (smiles) ->
      smiles = smiles.replace(/\//g, "%2F").replace(/\\/g, "%5c")
      htmlLabel.append('<img style="padding-left: 20px;" src="http://localhost:3000/getSvg/' + lineNumber + '/' + smiles + '" />');
      return

  molViewDisplay = () ->
    $("#ligandSelectionScript .alert").each () ->

      displaySvg($(this))

      $(this).click () ->
        lineNumber = $(this).attr("data-lineNumber")
        httpGet "#{restAddr}/api/v1.0/ligandLine/#{selectedProtein}/#{selectedLigand}/#{lineNumber}", (smiles) ->
          window.open("http://molview.org/?smiles=#{smiles}")
          return
        return
      return
    return

  ligandSearch = (ligandJson) ->
    ligandJson = JSON.parse ligandJson
    ligandSelections = ligandJson.ligandSelections
    if ligandSelections?
      toggleEltDisabled "#ligandSearch", false

      $( "#ligandSearch" ).keyup () ->
        enteredText = $(this).val()
        matchedLigandIds = []
        for ligandId in ligandSelections
          if  ligandId.indexOf(enteredText) > -1
            lineNumber = base10val(ligandId.substring(0, 3)) + 1
            matchedLigandIds.push({"ligand": "#{ligandId} - #{lineNumber}", "lineNumber": lineNumber})

        if matchedLigandIds.length > 0
          renderList "ligandSelectionScript", {"ligandRegex": matchedLigandIds}
          toggleEltDisplay("#ligandSelectionPanel", 'show')
          molViewDisplay()
        else
          $("#ligandSelectionScript").html('')
          toggleEltDisplay("#ligandSelectionPanel", 'hide')
        return
    else
      toggleEltDisabled "#ligandSearch", true
    return

  addLigandToLibrary = (libraryName) ->
    json = {"libraryName": libraryName}
    for file in document.getElementById('molfile').files
      if file
        reader = new FileReader()
        reader.onload = (theFile) ->
          contents = theFile.target.result
          lines = contents.split("\n")
          molecule = chem.Molfile.parseCTFile(lines)
          smiles = new chem.SmilesSaver().saveMolecule(molecule)
          json["smiles"] = smiles
          httpPost("#{restAddr}/api/v1.0/addToLibrary/#{selectedProtein}/", JSON.stringify(json), displayMessage)
          $("#createLigandLibraryModal").modal('hide')
          return
        reader.readAsText(file)
    return

  $("#addToLibraryBtn").click () ->
    libraryName = $("#libraryName").val()
    if libraryName != "" and selectedProtein != null
      addLigandToLibrary libraryName
    return

  ### Main ###
  httpGet("#{restAddr}/api/v1.0/proteins", populateProteins)

)(window)