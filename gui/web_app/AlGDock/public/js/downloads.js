var fs = require('fs');
var url = require('url');
var http = require('http');
var exports = module.exports = {};

var file_url = '/Users/Iva/School/College/Sophomore/IPRO/AlGDock/gui/web-app/AlGDock/public/foo-data.txt'; //file to download
var DOWNLOAD_DIR = '/Users/Iva/Downloads/'; //directory to download to

// Function to download file using HTTP.get
exports.download_file = function() {
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
};