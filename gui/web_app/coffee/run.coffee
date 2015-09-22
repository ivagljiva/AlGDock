((window) ->

  displayMessage = (message) ->
    alert message
    return

  ### Listeners ###
  $("#runBtn").click () ->
    selectedRunType = $("#runTypeDropdownBtn").html()
    selectedProtein = $("#proteinDropdownBtn").html()
    selectedLigand = $("#ligandDropdownBtn").html()
    selectedProtocol = $("#protocolDropdownBtn").html()
    coolThermSpeed = $("#coolThermSpeed").html()
    dockThermSpeed = $("dockThermSpeed").html()
    selectedSampler = $("samplerDropdownBtn").html()
    mcmcMoves = $("mcmcMoves").html()
    seedsPerState = $("seedsPerState").html()
    stepsPerSeed = $("stepsPerSeed").html()
    sweepsPerCycle = $("sweepsPerCycle").html()
    attemptsPerSweep = $("attemptsPerSweep").html()
    stepsPerSweep = $("stepsPerSweep").html()
    coolRepXCycles = $("coolRepXCycles").html()
    dockRepXCycles = $("dockRepXCycles").html()
    selectedSite = $("siteDropdownBtn").html()
    siteCenterX = $("siteCenterX").html()
    siteCenterY = $("siteCenterY").html()
    siteCenterZ = $("siteCenterZ").html()
    siteMaxRadius = $("siteMaxRadius").html()
    siteDensity = $("siteDensity").html()
    selectedPhases = $("phasesDropdownBtn").html()
    numberOfCores = $("#cores").html()
    rmsd = $("#RMSD").html()

    if selectedProtein != "Select Protein" and selectedLigand != "Select Ligand(s)"
      httpGet("http://127.0.0.1:5000/api/v1.0/run/#{selectedProtein}/#{selectedLigand}", displayMessage)
    return
  return

)(window)