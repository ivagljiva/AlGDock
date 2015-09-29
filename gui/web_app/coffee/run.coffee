((window) ->

  displayMessage = (message) ->
    alert message
    return

  ### Listeners ###
  $("#runBtn").click () -> 
    selectedProtein = $("#proteinDropdownBtn").html()
    selectedLigand = $("#ligandDropdownBtn").html()
    selectedProtocol = $("#protocolDropdownBtn").html()
    selectedRuntype = $("#runtypeDropdownBtn").html()
    selectedCThermSpeed = $("#coolThermSpeedTxtBox").html()
    selectedDThermSpeed = $("#dockThermSpeedTxtBox").html()
    selectedSampler = $("#samplerDropdownBtn").html()
    selectedMcmc = $("#mcmcMovesTxtBox").html()
    selectedSeedsPerState = $("#seedsPerStateTxtBox").html()
    selectedStepsPerSeed = $("#stepsPerSeedTxtBox").html()
    selectedSweepsPerCycle = $("#sweepsPerCycleTxtBox").html()
    selectedAttemptsPerSweep = $("#attemptsPerSweepTxtBox").html()
    selectedStepsPerSweep = $("#stepsPerSweepTxtBox").html()
    selectedCRepXCycles = $("#coolRepXCyclesTxtBox").html()
    selectedDRepXCycles = $("#dockRepXCyclesTxtBox").html()
    selectedSite = $("#siteDropdownBtn").html()
    selectedSiteCenterX = $("#siteCenterXTxtBox").html()
    selectedSiteCenterY = $("#siteCenterYTxtBox").html()
    selectedSiteCenterZ = $("#siteCenterZTxtBox").html()
    selectedSiteMaxRadius = $("#siteMaxRadiusTxtBox").html()
    selectedSiteDensity = $("#siteDensityTxtBox").html()
    selectedPhase = $("#phaseDropdownBtn").html()
    selectedCores = $("#coresTxtBox").html()
    selectedRmsd = $("#rmsdChkBox").html()

    if selectedProtein != "Select Protein" and selectedLigand != "Select Ligand(s)"
      httpGet("http://127.0.0.1:5000/api/v1.0/run/#{selectedProtein}/#{selectedLigand}/#{selectedProtocol}/#{selectedRuntype}/#{selectedCThermSpeed}/#{selectedDThermSpeed}/#{selectedSampler}/#{selectedMcmc}/#{selectedSeedsPerState}/#{selectedStepsPerSeed}/#{selectedSweepsPerCycle}/#{selectedAttemptsPerSweep}/#{selectedStepsPerSweep}/#{selectedCRepXCycles}/#{selectedDRepXCycles}/#{selectedSite}/#{selectedSiteCenterX}/#{selectedSiteCenterY}/#{selectedSiteCenterZ}/#{selectedSiteMaxRadius}/#{selectedSiteDensity}/#{selectedPhase}/#{selectedCores}/#{selectedRmsd}", displayMessage)
    return
  return

)(window)