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

  populateProtocols = (protocolJson) ->
    protocolJson = JSON.parse protocolJson
    renderList "protocolScript", {"protocolList": protocolJson.protocol}

    $("#protocolScript li a").click () ->
      selectedProtocol = $(this).html()
      $("#protocolDropdownBtn").html selectedProtocol
      return
    return

  ### Main ###
  httpGet("http://127.0.0.1:5000/api/v1.0/proteins", populateProteins)
  httpGet("http://127.0.0.1:5000/api/v1.0/protocols", populateProtocols)

  return

)(window)