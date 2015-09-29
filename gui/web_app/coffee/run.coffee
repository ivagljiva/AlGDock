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
    selectedCThermSpeed = $("#coolThermSpeedTxtBox").val()
    selectedDThermSpeed = $("#dockThermSpeedTxtBox").val()
    selectedSampler = $("#samplerDropdownBtn").html()
    selectedMcmc = $("#mcmcMovesTxtBox").val()
    selectedSeedsPerState = $("#seedsPerStateTxtBox").val()
    selectedStepsPerSeed = $("#stepsPerSeedTxtBox").val()
    selectedSweepsPerCycle = $("#sweepsPerCycleTxtBox").val()
    selectedAttemptsPerSweep = $("#attemptsPerSweepTxtBox").val()
    selectedStepsPerSweep = $("#stepsPerSweepTxtBox").val()
    selectedCRepXCycles = $("#coolRepXCyclesTxtBox").val()
    selectedDRepXCycles = $("#dockRepXCyclesTxtBox").val()
    selectedSite = $("#siteDropdownBtn").html()
    selectedSiteCenterX = $("#siteCenterXTxtBox").val()
    selectedSiteCenterY = $("#siteCenterYTxtBox").val()
    selectedSiteCenterZ = $("#siteCenterZTxtBox").val()
    selectedSiteMaxRadius = $("#siteMaxRadiusTxtBox").val()
    selectedSiteDensity = $("#siteDensityTxtBox").val()
    selectedPhase = $("#phaseDropdownBtn").html()
    selectedCores = $("#coresTxtBox").val()
    selectedRmsd = $("#rmsdChkBox").val()

    if selectedProtein != "Select Protein" and selectedLigand != "Select Ligand(s)"
      httpGet("http://127.0.0.1:5000/api/v1.0/run/#{selectedProtein}/#{selectedLigand}/#{selectedProtocol}/#{selectedRuntype}/#{selectedCThermSpeed}/#{selectedDThermSpeed}/#{selectedSampler}/#{selectedMcmc}/#{selectedSeedsPerState}/#{selectedStepsPerSeed}/#{selectedSweepsPerCycle}/#{selectedAttemptsPerSweep}/#{selectedStepsPerSweep}/#{selectedCRepXCycles}/#{selectedDRepXCycles}/#{selectedSite}/#{selectedSiteCenterX}/#{selectedSiteCenterY}/#{selectedSiteCenterZ}/#{selectedSiteMaxRadius}/#{selectedSiteDensity}/#{selectedPhase}/#{selectedCores}/#{selectedRmsd}", displayMessage)
    return
  return

)(window)