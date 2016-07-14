// Source code for Run button (currently on pre-run.hjs page)

(function(window) {

  /* Listeners */
  /* Pedro */

	// User can define custom run-time parameters for the software
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

    /*document.getElementById("runtypeDropdownBtn")
    document.getElementById("protocolDropdownBtn")
    document.getElementById("samplerDropdownBtn")
    document.getElementById("siteDropdownBtn")
    document.getElementById("phaseDropdownBtn")
    document.getElementById("scoreDropdownBtn")*/
  });
  
	// Pre-set runtime parameters for the Best docking
	// Note: These values do not currently reflect the actual parameters for Best docking
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

    /*document.getElementById("runtypeDropdownBtn").html("1");
    document.getElementById("protocolDropdownBtn")
    document.getElementById("samplerDropdownBtn")
    document.getElementById("siteDropdownBtn")
    document.getElementById("phaseDropdownBtn")
    document.getElementById("scoreDropdownBtn")*/
  });

	// Pre-set runtime parameters for Fast docking
	// Note: These values do not currently reflect the actual parameters for Fast docking
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

    /*document.getElementById("runtypeDropdownBtn")
    document.getElementById("protocolDropdownBtn")
    document.getElementById("samplerDropdownBtn")
    document.getElementById("siteDropdownBtn")
    document.getElementById("phaseDropdownBtn")
    document.getElementById("scoreDropdownBtn")*/
  });

  /* Pedro */
  // When user changes settings, obtain the new values for the run-time parameters
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
  
  // When the run button is pressed, obtain the protein and ligand selections (and the user's email)
  // and call the run function in REST.py to run the docking software on these files
  $("#RunBtn").click(function() {
    var email, selectedLigand, selectedProtein;
    selectedProtein = $("#btnSelectProtein").html();
    selectedLigand = $("#btnSelectLigand").html();
    console.log("Lig is ", selectedLigand, " and prot is ", selectedProtein);
    
    email = document.cookie.split(';')[1].split('=')[1];
    if (selectedProtein !== "Protein" && selectedLigand !== "Ligand Library" && selectedLigand !== "Create Ligand Library") {
      httpGet(restAddr + "/api/v1.0/run/" + selectedProtein + "/" + selectedLigand + "/" + email, displayMessage);
    }
  });
  
  // When this button is pressed, obtain the protein and ligand selections (and the user's email)
  // and call the prepareLigandLibrary function in REST.py to run the preparation script on these files
  $("#prepLigandLibraryBtn").click(function() {
    var email, selectedLigand, selectedProtein;
    selectedProtein = $("#proteinDropdownBtn").html();
    selectedLigand = $("#ligandDropdownBtn").html();
    email = document.cookie.split(';')[1].split('=')[1];
    if (selectedProtein !== "Protein" && selectedLigand !== "Ligand Library" && selectedLigand !== "Create Ligand Library") {
      // see prepareLigandLibrary(protein, ligand, email) in REST.py
      httpGet(restAddr + "/api/v1.0/prepLigandLibrary/" + selectedProtein + "/" + selectedLigand + "/" + email, displayMessage);
    }
  });
})(window);
