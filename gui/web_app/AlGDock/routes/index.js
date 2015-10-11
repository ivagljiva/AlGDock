var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

var fs = require('fs');
var People = require('../public/models/people.js');

var transporter = require('../public/mailer.js');
var valid_user = require('./valid_user')

/* --------------------
   | Helper Functions |
   -------------------- */

fs.readdirSync(__dirname + '/../public/models').forEach(function (filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/../public/models/' + filename)

});

function create_hash(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

function generate_tok() {
    return crypto.randomBytes(16).toString('base64').replace('/', '');
}

function send_mail(mail){
    transporter.sendMail(mail, function(error, info){
	if(error){
            console.log(error);
	}else{
            console.log('Message sent: ' + info.response);
	}
    });
}

function db_save(model) {
    model.save(function (err) {
	if (err) console.log(err);
    });
}

/* ----------
   | Routes |
   ---------- */

// Main page
router.get('/', valid_user, function(req, res, next) {
    res.render('index');
});

// Login and Registration
router.post('/', function(req, res) {
    mongoose.model('peoples').findOne({people_username : req.body.login_mail}, function(err, peoples) {
	if (peoples === null) {
	    console.log(err);
	    res.render('login', { hide_class : '', alert_type: 'alert-danger', alert: "We're sorry. We could not find a user with those credentials."});
	}

	else if (create_hash(req.body.login_pass) === peoples["people_password"]){
	    if (peoples["last_login"] === null){
		peoples["email_verify"] = generate_tok();
		db_save(peoples);

		verify_link = 'http://localhost:3000/verify_email/' + req.body.login_mail + '/' + peoples["email_verify"];

		var verifyEmail = {
		    from: 'AlGDock Admin <algdock.ipro@gmail.com>',
		    to: peoples["people_username"],
		    subject: 'AlGDock | Email Verification',
		    html: 'You are receiving this message because you must verify your email address.<br><br>Just click the link below and you are done!<br>' + '<a href=\"' + verify_link + '\">' + verify_link + '</a>'
		};

		send_mail(verifyEmail);
		res.render('login', {hide_class : '', alert_type: 'alert-success', alert : "Please verify your email address. An email has been sent to you." });
	    }
	    else {
		logged_tok = generate_tok();

		res.cookie('logged_tok', logged_tok);
		res.cookie('user', peoples["people_username"]);
		peoples["logged_tok"] = logged_tok;
		db_save(peoples);
		res.redirect('/');
	    }
	}
	else {
	    res.render('login', { hide_class : '', alert_type: 'alert-danger', alert: 'Invalid log in.'});
	}
    });
});

router.post('/reg', function(req, res, next) {
    var email = req.body.reg_mail;
    mongoose.model('peoples').findOne({people_username : email}, function(err, peoples){
	if(peoples !== null){
	    res.render('login', {hide_class : '', alert_type: 'alert-danger', alert: 'This email is already in use. Did you forget your password?'});
	}
	else{
	    var new_people = new People({
		people_username : email,
		people_password : create_hash(req.body.reg_pass2),
	    });
	    db_save(new_people);
	    res.render('login', {hide_class : '', alert_type: 'alert-success', alert: 'You have been successfully registered.'});
	}
    });
});

router.get('/verify_email/:email/:tok', function(req, res) {
    mongoose.model('peoples').findOne({people_username : req.params.email}, function(err, peoples){
	if (peoples["email_verify"] === req.params.tok){
	    peoples.last_login = Date.now();
	    db_save(peoples);

	    res.render('login', { hide_class: '', alert_type: 'alert-success', alert : 'Your email has been successfully verified. You may now log in.' });
	}
	else{
	    var err = new Error('Not Found.')
	    res.render('error', {message : err.message, error: err});
	}
    });
});

router.get('/logout', function(req, res) {
    res.clearCookie('logged_tok');
    res.clearCookie('user');
    res.redirect('/');
});


module.exports = router;
