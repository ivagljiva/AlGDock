(function(window) {
  var displayMessage;
  displayMessage = function(message) {
    alert(message);
  };

  /* Listeners */
  $("#runBtn").click(function() {
    var selectedAttemptsPerSweep, selectedCRepXCycles, selectedCThermSpeed, selectedCores, selectedDRepXCycles, selectedDThermSpeed, selectedLigand, selectedMcmc, selectedPhase, selectedProtein, selectedProtocol, selectedRmsd, selectedRuntype, selectedSampler, selectedSeedsPerState, selectedSite, selectedSiteCenterX, selectedSiteCenterY, selectedSiteCenterZ, selectedSiteDensity, selectedSiteMaxRadius, selectedStepsPerSeed, selectedStepsPerSweep, selectedSweepsPerCycle;
    selectedProtein = $("#proteinDropdownBtn").html();
    selectedLigand = $("#ligandDropdownBtn").html();
    selectedProtocol = $("#protocolDropdownBtn").html();
    selectedRuntype = $("#runtypeDropdownBtn").html();
    selectedCThermSpeed = float($("#coolThermSpeedTxtBox").html());
    selectedDThermSpeed = float($("#dockThermSpeedTxtBox").html());
    selectedSampler = $("#samplerDropdownBtn").html();
    selectedMcmc = float($("#mcmcMovesTxtBox").html());
    selectedSeedsPerState = float($("#seedsPerStateTxtBox").html());
    selectedStepsPerSeed = float($("#stepsPerSeedTxtBox").html());
    selectedSweepsPerCycle = float($("#sweepsPerCycleTxtBox").html());
    selectedAttemptsPerSweep = float($("#attemptsPerSweepTxtBox").html());
    selectedStepsPerSweep = float($("#stepsPerSweepTxtBox").html());
    selectedCRepXCycles = float($("#coolRepXCyclesTxtBox").html());
    selectedDRepXCycles = float($("#dockRepXCyclesTxtBox").html());
    selectedSite = $("#siteDropdownBtn").html();
    selectedSiteCenterX = float($("#siteCenterXTxtBox").html());
    selectedSiteCenterY = float($("#siteCenterYTxtBox").html());
    selectedSiteCenterZ = float($("#siteCenterZTxtBox").html());
    selectedSiteMaxRadius = float($("#siteMaxRadiusTxtBox").html());
    selectedSiteDensity = float($("#siteDensityTxtBox").html());
    selectedPhase = $("#phaseDropdownBtn").html();
    selectedCores = float($("#coresTxtBox").html());
    selectedRmsd = $("#rmsdChkBox").html();
    if (selectedProtein !== "Select Protein" && selectedLigand !== "Select Ligand(s)") {
      httpGet("http://127.0.0.1:5000/api/v1.0/run/" + selectedProtein + "/" + selectedLigand + "/" + selectedProtocol + "/" + selectedRuntype + "/" + selectedCThermSpeed + "/" + selectedDThermSpeed + "/" + selectedSampler + "/" + selectedMcmc + "/" + selectedSeedsPerState + "/" + selectedStepsPerSeed + "/" + selectedSweepsPerCycle + "/" + selectedAttemptsPerSweep + "/" + selectedStepsPerSweep + "/" + selectedCRepXCycles + "/" + selectedDRepXCycles + "/" + selectedSite + "/" + selectedSiteCenterX + "/" + selectedSiteCenterY + "/" + selectedSiteCenterZ + "/" + selectedSiteMaxRadius + "/" + selectedSiteDensity + "/" + selectedPhase + "/" + selectedCores + "/" + selectedRmsd, displayMessage);
    }
  });
})(window);
