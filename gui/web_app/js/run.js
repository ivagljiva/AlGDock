(function(window) {
  var displayMessage, fs;
  displayMessage = function(message) {};
  fs = require("fs");
  preferencesFile.writeFile("BindingPMF_preferences.py", message, function(error) {
    if (error) {
      return alert("Error occurred while writing preferences file");
    }
  });
  return;

  /* Listeners */
  $("#runBtn").click(function() {
    var selectedAttemptsPerSweep, selectedCRepXCycles, selectedCThermSpeed, selectedCores, selectedDRepXCycles, selectedDThermSpeed, selectedLigand, selectedMcmc, selectedPhase, selectedProtein, selectedProtocol, selectedRmsd, selectedRuntype, selectedSampler, selectedSeedsPerState, selectedSite, selectedSiteCenterX, selectedSiteCenterY, selectedSiteCenterZ, selectedSiteDensity, selectedSiteMaxRadius, selectedStepsPerSeed, selectedStepsPerSweep, selectedSweepsPerCycle;
    selectedProtein = $("#proteinDropdownBtn").html();
    selectedLigand = $("#ligandDropdownBtn").html();
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
    if (selectedProtein !== "Select Protein" && selectedLigand !== "Select Ligand(s)") {
      httpGet("http://127.0.0.1:5000/api/v1.0/run/" + selectedProtein + "/" + selectedLigand + "/" + selectedProtocol + "/" + selectedRuntype + "/" + selectedCThermSpeed + "/" + selectedDThermSpeed + "/" + selectedSampler + "/" + selectedMcmc + "/" + selectedSeedsPerState + "/" + selectedStepsPerSeed + "/" + selectedSweepsPerCycle + "/" + selectedAttemptsPerSweep + "/" + selectedStepsPerSweep + "/" + selectedCRepXCycles + "/" + selectedDRepXCycles + "/" + selectedSite + "/" + selectedSiteCenterX + "/" + selectedSiteCenterY + "/" + selectedSiteCenterZ + "/" + selectedSiteMaxRadius + "/" + selectedSiteDensity + "/" + selectedPhase + "/" + selectedCores + "/" + selectedRmsd, displayMessage);
    }
  });
})(window);
