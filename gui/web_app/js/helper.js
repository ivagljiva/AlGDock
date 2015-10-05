(function(window) {
  var key;
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
  this.httpGet = function(url, callback) {
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
  this.httpPost = function(url, jsonString) {
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(jsonString);
  };

  /* Ligand Id Conversions */
  key = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  /* Returns a 3-letter code corresponding to a base-10 number */
  this.code = function(val) {
    return key[Math.floor(val / 36 / 36) % 36] + key[Math.floor(val / 36) % 36] + key[val % 36];
  };

  /* Returns a base-10 number corresponding to a 3-letter code */
  return this.base10val = function(code) {
    return key.indexOf(code[0]) * 36 * 36 + key.indexOf(code[1]) * 36 + key.indexOf(code[2]);
  };
})(window);
