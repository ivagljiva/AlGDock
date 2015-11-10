((window) ->

  ### Global Variables ###
  this.restAddr = "http://localhost:5000"

  ### Helper Functions ###
  this.toggleEltDisabled = (elt, newState) ->
    $("#{elt}").prop('disabled', newState)
    return

  this.toggleEltDisplay = (elt, state) ->
    if state == 'show'
      $("#{elt}").slideDown('slow')
    else
      $("#{elt}").slideUp('slow')
    return

  this.renderList = (htmlID, data) ->
    compiledTemplate = TEMPLATES[htmlID]
    renderedTemplate = compiledTemplate.render(data)
    $("##{htmlID}").html renderedTemplate
    return

  this.httpGet = (url, callback) ->
    xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange = () ->
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText)
      return

    xmlHttp.open("GET", url, true)
    xmlHttp.send(null)
    return

  this.httpPost = (url, jsonString) ->
    xmlHttp = new XMLHttpRequest()
    xmlHttp.open("POST", url)
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xmlHttp.send(jsonString)
    return

  ### Ligand Id Conversions ###
  key = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

  ### Returns a 3-letter code corresponding to a base-10 number ###
  this.code = (val) ->
    return key[Math.floor(val/36/36)%36]+key[Math.floor(val/36)%36]+key[val%36]

  ### Returns a base-10 number corresponding to a 3-letter code ###
  this.base10val = (code) ->
    return key.indexOf(code[0])*36*36 + key.indexOf(code[1])*36 + key.indexOf(code[2])

)(window)