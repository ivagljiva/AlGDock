(function(window) {

  /* Listeners */
  /* Pedro */

  $("#rCustom").click(function() {
    document.getElementById("coolThermSpeedTxtBox").value=1.5;
    document.getElementById("dockThermSpeedTxtBox").value=1.5;
    document.getElementById("mcmcMovesTxtBox").value=1;
    document.getElementById("seedsPerStateTxtBox").value=10;
    document.getElementById("stepsPerSeedTxtBox").value=200;
    document.getElementById("sweepsPerCycleTxtBox").value=10;
    document.getElementById("attemptsPerSweepTxtBox").value=100;
    document.getElementById("stepsPerSweepTxtBox").value=50;    
    document.getElementById("coolRepXCyclesTxtBox").value=2;
    document.getElementById("dockRepXCyclesTxtBox").value=3;
    document.getElementById("siteMaxRadiusTxtBox").value=0.01;
    document.getElementById("siteDensityTxtBox").value=10;
    document.getElementById("coresTxtBox").value=-1;
    document.getElementById("fromTxtBox").value=0;
    document.getElementById("toTxtBox").value=1;        
  });

  $("#rBest").click(function() {
    document.getElementById("coolThermSpeedTxtBox").value=1000;
    document.getElementById("dockThermSpeedTxtBox").value=1000;
    document.getElementById("mcmcMovesTxtBox").value=1000;
    document.getElementById("seedsPerStateTxtBox").value=1000;
    document.getElementById("stepsPerSeedTxtBox").value=1000;
    document.getElementById("sweepsPerCycleTxtBox").value=1000;
    document.getElementById("attemptsPerSweepTxtBox").value=1000;
    document.getElementById("stepsPerSweepTxtBox").value=1000;    
    document.getElementById("coolRepXCyclesTxtBox").value=1000;
    document.getElementById("dockRepXCyclesTxtBox").value=1000;
    document.getElementById("siteMaxRadiusTxtBox").value=1000;
    document.getElementById("siteDensityTxtBox").value=1000;
    document.getElementById("coresTxtBox").value=1000;
    document.getElementById("fromTxtBox").value=0;
    document.getElementById("toTxtBox").value=1000;        
  });

  $("#rFast").click(function() {
    document.getElementById("coolThermSpeedTxtBox").value=1;
    document.getElementById("dockThermSpeedTxtBox").value=1;
    document.getElementById("mcmcMovesTxtBox").value=1;
    document.getElementById("seedsPerStateTxtBox").value=1;
    document.getElementById("stepsPerSeedTxtBox").value=1;
    document.getElementById("sweepsPerCycleTxtBox").value=1;
    document.getElementById("attemptsPerSweepTxtBox").value=1;
    document.getElementById("stepsPerSweepTxtBox").value=1;    
    document.getElementById("coolRepXCyclesTxtBox").value=1;
    document.getElementById("dockRepXCyclesTxtBox").value=1;
    document.getElementById("siteMaxRadiusTxtBox").value=1;
    document.getElementById("siteDensityTxtBox").value=1;
    document.getElementById("coresTxtBox").value=1;
    document.getElementById("fromTxtBox").value=0;
    document.getElementById("toTxtBox").value=1;        
  });

  /* Pedro */
  $("#savePrefBtn").click(function() {
    var selectedAttemptsPerSweep, selectedCRepXCycles, selectedCThermSpeed, selectedCores, selectedDRepXCycles, selectedDThermSpeed, selectedFReps, selectedMcmc, selectedPhase, selectedProtein, selectedProtocol, selectedRmsd, selectedRuntype, selectedSampler, selectedScore, selectedSeedsPerState, selectedSite, selectedSiteCenterX, selectedSiteCenterY, selectedSiteCenterZ, selectedSiteDensity, selectedSiteMaxRadius, selectedStepsPerSeed, selectedStepsPerSweep, selectedSweepsPerCycle, selectedTReps;
    selectedProtein = $("#proteinDropdownBtn").html();
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
    selectedScore = $("#scoreDropdownBtn").html();
    selectedFReps = $("#fromTxtBox").val();
    selectedTReps = $("#toTxtBox").val();
    if (selectedProtein !== "Protein" && selectedProtocol !== "Select a Protocol" && selectedRuntype !== "Select a Run Type" && selectedCThermSpeed !== "" && selectedDThermSpeed !== "" && selectedSampler !== "Select a Sampler" && selectedMcmc !== "" && selectedSeedsPerState !== "" && selectedStepsPerSeed !== "" && selectedSweepsPerCycle !== "" && selectedAttemptsPerSweep !== "" && selectedStepsPerSweep !== "" && selectedCRepXCycles !== "" && selectedDRepXCycles !== "" && selectedSite !== "Select a Site" && selectedSiteCenterX !== "" && selectedSiteCenterY !== "" && selectedSiteCenterZ !== "" && selectedSiteMaxRadius !== "" && selectedSiteDensity !== "" && selectedPhase !== "Phases" && selectedCores !== "" && selectedFReps !== "" && selectedTReps !== "") {
      httpGet(restAddr + "/api/v1.0/run/" + selectedProtein + "/" + selectedProtocol + "/" + selectedRuntype + "/" + selectedCThermSpeed + "/" + selectedDThermSpeed + "/" + selectedSampler + "/" + selectedMcmc + "/" + selectedSeedsPerState + "/" + selectedStepsPerSeed + "/" + selectedSweepsPerCycle + "/" + selectedAttemptsPerSweep + "/" + selectedStepsPerSweep + "/" + selectedCRepXCycles + "/" + selectedDRepXCycles + "/" + selectedSite + "/" + selectedSiteCenterX + "/" + selectedSiteCenterY + "/" + selectedSiteCenterZ + "/" + selectedSiteMaxRadius + "/" + selectedSiteDensity + "/" + selectedPhase + "/" + selectedCores + "/" + selectedScore + "/" + selectedFReps + "/" + selectedTReps + "/" + selectedRmsd, displayMessage);
    }
  });
  $("#runBtn").click(function() {
    var email, selectedLigand, selectedProtein;
    selectedProtein = $("#proteinDropdownBtn").html();
    selectedLigand = $("#ligandDropdownBtn").html();
    email = document.cookie.split(';')[1].split('=')[1];
    if (selectedProtein !== "Protein" && selectedLigand !== "Ligand Library" && selectedLigand !== "Create Ligand Library") {
      httpGet(restAddr + "/api/v1.0/run/" + selectedProtein + "/" + selectedLigand + "/" + email, displayMessage);
    }
  });
  $("#prepLigandLibraryBtn").click(function() {
    var email, selectedLigand, selectedProtein;
    selectedProtein = $("#proteinDropdownBtn").html();
    selectedLigand = $("#ligandDropdownBtn").html();
    email = document.cookie.split(';')[1].split('=')[1];
    if (selectedProtein !== "Protein" && selectedLigand !== "Ligand Library" && selectedLigand !== "Create Ligand Library") {
      httpGet(restAddr + "/api/v1.0/prepLigandLibrary/" + selectedProtein + "/" + selectedLigand + "/" + email, displayMessage);
    }
  });
})(window);
