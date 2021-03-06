((window) ->

  ### Listeners ###
  $("#savePrefBtn").click () ->
    selectedProtein = $("#proteinDropdownBtn").html()
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
    selectedRmsd = $("#rmsdChkBox").is(':checked')
    selectedScore = $("#scoreDropdownBtn").html()
    selectedFReps = $("#fromTxtBox").val()
    selectedTReps = $("#toTxtBox").val()

    if selectedProtein != "Protein" and selectedProtocol != "Select a Protocol" and selectedRuntype != "Select a Run Type" and selectedCThermSpeed != "" and selectedDThermSpeed != "" and selectedSampler != "Select a Sampler" and selectedMcmc != "" and selectedSeedsPerState != "" and selectedStepsPerSeed != "" and selectedSweepsPerCycle != "" and selectedAttemptsPerSweep != "" and selectedStepsPerSweep != "" and selectedCRepXCycles != "" and selectedDRepXCycles != "" and selectedSite != "Select a Site" and selectedSiteCenterX != "" and selectedSiteCenterY != "" and selectedSiteCenterZ != "" and selectedSiteMaxRadius != "" and selectedSiteDensity != "" and selectedPhase != "Phases" and selectedCores != "" and selectedFReps != "" and selectedTReps != ""
      httpGet("#{restAddr}/api/v1.0/run/#{selectedProtein}/#{selectedProtocol}/#{selectedRuntype}/#{selectedCThermSpeed}/#{selectedDThermSpeed}/#{selectedSampler}/#{selectedMcmc}/#{selectedSeedsPerState}/#{selectedStepsPerSeed}/#{selectedSweepsPerCycle}/#{selectedAttemptsPerSweep}/#{selectedStepsPerSweep}/#{selectedCRepXCycles}/#{selectedDRepXCycles}/#{selectedSite}/#{selectedSiteCenterX}/#{selectedSiteCenterY}/#{selectedSiteCenterZ}/#{selectedSiteMaxRadius}/#{selectedSiteDensity}/#{selectedPhase}/#{selectedCores}/#{selectedScore}/#{selectedFReps}/#{selectedTReps}/#{selectedRmsd}", displayMessage)
    return

  $("#runBtn").click () ->
    selectedProtein = $("#proteinDropdownBtn").html()
    selectedLigand = $("#ligandDropdownBtn").html()

    email = document.cookie.split(';')[1].split('=')[1]

    if selectedProtein != "Protein" and selectedLigand != "Ligand Library" and selectedLigand != "Create Ligand Library"
      httpGet("#{restAddr}/api/v1.0/run/#{selectedProtein}/#{selectedLigand}/#{email}", displayMessage)
    return

  $("#prepLigandLibraryBtn").click () ->
    selectedProtein = $("#proteinDropdownBtn").html()
    selectedLigand = $("#ligandDropdownBtn").html()

    email = document.cookie.split(';')[1].split('=')[1]

    if selectedProtein != "Protein" and selectedLigand != "Ligand Library" and selectedLigand != "Create Ligand Library"
      httpGet("#{restAddr}/api/v1.0/prepLigandLibrary/#{selectedProtein}/#{selectedLigand}/#{email}", displayMessage)
    return

  return
)(window)