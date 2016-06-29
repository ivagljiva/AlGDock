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
