(function(window) {
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
