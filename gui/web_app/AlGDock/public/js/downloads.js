// Source code for downloading docking results from the cluster

var fs = require('fs');
var url = require('url');
var http = require('http');
var exports = module.exports = {};


// OLD function 
/*exports.download_file = function() {
	var options = {
    	host: url.parse(file_url).host,
    	port: 3000,
    	path: url.parse(file_url).pathname
	};
	var file_name = url.parse(file_url).pathname.split('/').pop();
	console.log("The file name is " + file_name);
	var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
	
	http.get(options, function(res) {
		res.on('data', function(data) {
				file.write(data);
			}).on('end', function() {
				file.end();
				console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
		});
	}); 
}; */

// Function to download file using HTTP.get
// This function is exported when another script requires downloads.js
exports.download_file = function(prot, lig) {
	var file_url = "http://localhost:5000/api/v1.0/download/cieslakluiz@gmail.com/"+prot+"/"+lig; //file path on cluster to download
	var DOWNLOAD_DIR = '/Users/Iva/Downloads/'; //directory to download to
	//TARGET variable on cluster should be set to /home/ldasilva/target/
	var file_name = url.parse(file_url).pathname.split('/').pop();
	console.log("The file URL is " + file_url);
	console.log("The file name is " + file_name);
	var file = fs.createWriteStream(DOWNLOAD_DIR + 	file_name);
	var request = http.get(file_url, function(response) {
		response.pipe(file);
		console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
	});
};