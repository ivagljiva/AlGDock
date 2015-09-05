((window) ->

  displayMessage = (message) ->
    alert message
    return

  ### Listeners ###
  $("#runBtn").click () ->
    selectedProtein = $("#proteinDropdownBtn").html()
    selectedLigand = $("#ligandDropdownBtn").html()

    if selectedProtein != "Select Protein" and selectedLigand != "Select Ligand(s)"
      httpGet("http://127.0.0.1:5000/api/v1.0/run/#{selectedProtein}/#{selectedLigand}", displayMessage)
    return
  return

)(window)