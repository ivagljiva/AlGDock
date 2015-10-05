((window) ->

  selectedProtein = null
  selectedLigand = null

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
      httpGet("http://127.0.0.1:5000/api/v1.0/ligandSelection/#{selectedProtein}/#{selectedLigand}", ligandSearch)
      return
    return

  ligandSearch = (ligandJson) ->
    ligandJson = JSON.parse ligandJson
    ligandSelections = ligandJson.ligandSelections
    if ligandSelections?
      toggleEltDisabled "#ligandSearch", false

      $( "#ligandSearch" ).keyup () ->
        enteredText = $(this).val()
        matchedLigandIds = ({"ligand": "#{ligandId} - #{base10val(ligandId.substring(0, 3)) + 1}"} for ligandId in ligandSelections when ligandId.indexOf(enteredText) > -1)

        if matchedLigandIds.length > 0
          renderList "ligandSelectionScript", {"ligandRegex": matchedLigandIds}
          toggleEltDisplay("#ligandSelectionPanel", 'show')
        else
          $("#ligandSelectionScript").html('')
          toggleEltDisplay("#ligandSelectionPanel", 'hide')


        return

    else
      toggleEltDisabled "#ligandSearch", true
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
    renderList "siteScript", {"siteList": siteJson.site}

    $("#siteScript li a").click () ->
      selectedsite = $(this).html()
      $("#siteDropdownBtn").html selectedsite
      return
    return

  populatePhases = (phaseJson) ->
    phaseJson = JSON.parse phaseJson
    renderList "phaseScript", {"phaseList": phaseJson.phase}

    $("#phaseScript li a").click () ->
      selectedphase = $(this).html()
      $("#phaseDropdownBtn").html selectedphase
      return
    return

  populateRuntypes = (runtypeJson) ->
    runtypeJson = JSON.parse runtypeJson
    renderList "runtypeScript", {"runtypeList": runtypeJson.runtype}

    $("#runtypeScript li a").click () ->
      selectedruntype = $(this).html()
      $("#runtypeDropdownBtn").html selectedruntype
      return
    return

  ### Main ###
  httpGet("http://127.0.0.1:5000/api/v1.0/proteins", populateProteins)
  httpGet("http://127.0.0.1:5000/api/v1.0/protocols", populateProtocols)
  httpGet("http://127.0.0.1:5000/api/v1.0/samplers", populateSamplers)
  httpGet("http://127.0.0.1:5000/api/v1.0/sites", populateSites)
  httpGet("http://127.0.0.1:5000/api/v1.0/phases", populatePhases)
  httpGet("http://127.0.0.1:5000/api/v1.0/runtypes", populateRuntypes)

  return

)(window)