(function(window) {
  this.toggleEltDisabled = function(elt, newState) {
    $("" + elt).prop('disabled', newState);
  };
  this.toggleEltDisplay = function(elt, state) {
    if (state === 'show') {
      $("" + elt).slideDown('slow');
    } else {
      $("" + elt).slideUp('slow');
    }
  };
  this.renderList = function(htmlID, data) {
    var compiledTemplate, renderedTemplate;
    compiledTemplate = TEMPLATES[htmlID];
    renderedTemplate = compiledTemplate.render(data);
    $("#" + htmlID).html(renderedTemplate);
  };
  return this.httpGet = function(url, callback) {
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        callback(xmlHttp.responseText);
      }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
  };
})(window);
