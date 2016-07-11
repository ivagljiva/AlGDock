// This script provides global variables and helper functions for other source code in the GUI

(function(window) {

  /* Global Variables */
  var key;
  this.restAddr = "http://localhost:5000"; // This is the path to REST.py script, currently running on the cluster
  // If you are running the GUI locally on your machine, you must ssh to the cluster with port forwarding (on port 5000)
  // in order to be able to connect to REST.py:
  // ssh -L 5000:localhost:5000 your-username@ccb.tbc.iit.edu

  /* Helper Functions */
  this.displayMessage = function(message) {
    alert(message);
  };
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
  this.httpPost = function(url, jsonString, callback) {
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(jsonString);
    callback("Library has been added.");
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
