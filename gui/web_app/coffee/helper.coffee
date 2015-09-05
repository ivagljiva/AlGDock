((window) ->

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
)(window)