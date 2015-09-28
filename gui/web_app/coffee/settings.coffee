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

  populateSamplers = (samplerJson) ->
    samplerJson = JSON.parse samplerJson
    renderList "samplerScript", {"samplerList": samplerJson.sampler}

    $("#samplerScript li a").click () ->
      selectedsampler = $(this).html()
      $("#samplerDropdownBtn").html selectedsampler
      return
    return

  populateSites = (siteJson) ->
    siteJson = JSON.parse siteJson
    renderList "siteScript", {"siteList": siteJson.sampler}

    $("#siteScript li a").click () ->
      selectedsite = $(this).html()
      $("#siteDropdownBtn").html sitesampler
      return
    return

  populatePhase = (phaseJson) ->
    phaseJson = JSON.parse phaseJson
    renderList "phaseScript", {"phaseList": phaseJson.phase}

    $("#phaseScript li a").click () ->
      selectedphase = $(this).html()
      $("#phaseDropdownBtn").html selectedphase
      return
    return

  ### Main ###
  httpGet("http://127.0.0.1:5000/api/v1.0/proteins", populateProteins)
  httpGet("http://127.0.0.1:5000/api/v1.0/protocols", populateProtocols)
  httpGet("http://127.0.0.1:5000/api/v1.0/samplers", populateSamplers)
  httpGet("http://127.0.0.1:5000/api/v1.0/sites", populateSites)
  httpGet("http://127.0.0.1:5000/api/v1.0/phases", populatePhase)

  return

)(window)