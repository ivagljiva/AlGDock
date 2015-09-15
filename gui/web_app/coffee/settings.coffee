((window) ->

  populateProteins = (proteinJson) ->
    proteinJson = JSON.parse proteinJson
    renderList "proteinScript", {"proteinList": proteinJson.files}

    $("#proteinScript li a").click () ->
      selectedProtein = $(this).html()
      $("#proteinDropdownBtn").html selectedProtein
      httpGet("http://127.0.0.1:5000/api/v1.0/ligands/#{selectedProtein}", populateLigands)
      return
    return

  populateLigands = (ligandJson) ->
    ligandJson = JSON.parse ligandJson
    renderList "ligandScript", {"ligandList": ligandJson.files}

    $("#ligandScript li a").click () ->
      selectedLigand = $(this).html()
      $("#ligandDropdownBtn").html selectedLigand
      return
    return

  ### Main ###
  httpGet("http://127.0.0.1:5000/api/v1.0/proteins", populateProteins)

  return

)(window)