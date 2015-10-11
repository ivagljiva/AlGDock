(function(window) {
  var displayMessage;
  displayMessage = function(message) {
    alert(message);
  };

  /* Listeners */
  $("#savePrefBtn").click(function() {
    var selectedAttemptsPerSweep, selectedCRepXCycles, selectedCThermSpeed, selectedCores, selectedDRepXCycles, selectedDThermSpeed, selectedMcmc, selectedPhase, selectedProtocol, selectedRmsd, selectedRuntype, selectedSampler, selectedSeedsPerState, selectedSite, selectedSiteCenterX, selectedSiteCenterY, selectedSiteCenterZ, selectedSiteDensity, selectedSiteMaxRadius, selectedStepsPerSeed, selectedStepsPerSweep, selectedSweepsPerCycle;
    selectedProtocol = $("#protocolDropdownBtn").html();
    selectedRuntype = $("#runtypeDropdownBtn").html();
    selectedCThermSpeed = $("#coolThermSpeedTxtBox").val();
    selectedDThermSpeed = $("#dockThermSpeedTxtBox").val();
    selectedSampler = $("#samplerDropdownBtn").html();
    selectedMcmc = $("#mcmcMovesTxtBox").val();
    selectedSeedsPerState = $("#seedsPerStateTxtBox").val();
    selectedStepsPerSeed = $("#stepsPerSeedTxtBox").val();
    selectedSweepsPerCycle = $("#sweepsPerCycleTxtBox").val();
    selectedAttemptsPerSweep = $("#attemptsPerSweepTxtBox").val();
    selectedStepsPerSweep = $("#stepsPerSweepTxtBox").val();
    selectedCRepXCycles = $("#coolRepXCyclesTxtBox").val();
    selectedDRepXCycles = $("#dockRepXCyclesTxtBox").val();
    selectedSite = $("#siteDropdownBtn").html();
    selectedSiteCenterX = $("#siteCenterXTxtBox").val();
    selectedSiteCenterY = $("#siteCenterYTxtBox").val();
    selectedSiteCenterZ = $("#siteCenterZTxtBox").val();
    selectedSiteMaxRadius = $("#siteMaxRadiusTxtBox").val();
    selectedSiteDensity = $("#siteDensityTxtBox").val();
    selectedPhase = $("#phaseDropdownBtn").html();
    selectedCores = $("#coresTxtBox").val();
    selectedRmsd = $("#rmsdChkBox").is(':checked');
    if (selectedProtocol !== "Select a Protocol" && selectedRuntype !== "Select a Run Type" && selectedCThermSpeed !== "" && selectedDThermSpeed !== "" && selectedSampler !== "Select a Sampler" && selectedMcmc !== "" && selectedSeedsPerState !== "" && selectedStepsPerSeed !== "" && selectedSweepsPerCycle !== "" && selectedAttemptsPerSweep !== "" && selectedStepsPerSweep !== "" && selectedCRepXCycles !== "" && selectedDRepXCycles !== "" && selectedSite !== "Select a Site" && selectedSiteCenterX !== "" && selectedSiteCenterY !== "" && selectedSiteCenterZ !== "" && selectedSiteMaxRadius !== "" && selectedSiteDensity !== "" && selectedPhase !== "Phases" && selectedCores !== "") {
      httpGet("http://127.0.0.1:5000/api/v1.0/run/" + selectedProtocol + "/" + selectedRuntype + "/" + selectedCThermSpeed + "/" + selectedDThermSpeed + "/" + selectedSampler + "/" + selectedMcmc + "/" + selectedSeedsPerState + "/" + selectedStepsPerSeed + "/" + selectedSweepsPerCycle + "/" + selectedAttemptsPerSweep + "/" + selectedStepsPerSweep + "/" + selectedCRepXCycles + "/" + selectedDRepXCycles + "/" + selectedSite + "/" + selectedSiteCenterX + "/" + selectedSiteCenterY + "/" + selectedSiteCenterZ + "/" + selectedSiteMaxRadius + "/" + selectedSiteDensity + "/" + selectedPhase + "/" + selectedCores + "/" + selectedRmsd, displayMessage);
    }
  });
  return;
  $("#runBtn").click(function() {});
})(window);
