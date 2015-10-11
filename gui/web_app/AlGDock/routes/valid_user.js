var mongoose = require('mongoose');

module.exports = function(req, res, next) {
    if (req.cookies.user)
	mongoose.model('peoples').findOne({people_username : req.cookies.user}, function (err, peoples) {
	    if (peoples === null)
		res.render('login');
	    else if (req.cookies.logged_tok === peoples["logged_tok"])
		next();
	    else
		res.render('login', {hide_class : 'hide_elt', alert_type: '', alert: ''});
	});
    else
	res.render('login', {hide_class : 'hide_elt', alert_type: '', alert: ''});
};
