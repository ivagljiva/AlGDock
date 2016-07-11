// Called when a browser tries to access the root location in the GUI ('localhost:3000/')
// If the user is already logged in, it just allows the routing to continue to the home page
// Otherwise, it renders the Login/Registration page

var mongoose = require('mongoose');

module.exports = function(req, res, next) {
    if (req.cookies.user)
	mongoose.model('peoples').findOne({people_username : req.cookies.user}, function (err, peoples) {
	    if (peoples === null)
		res.render('register', {partials: {header: 'header', footer: 'footer'}});
	    else
		next();
	});
    else
	res.render('register',
  {
    title: 'AlGDock | Login or Register',
    hide_class : 'hide_elt',
    alert_type: '',
    alert: '',
    partials: {header: 'header', footer: 'footer'},
  });
};
