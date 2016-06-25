var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

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
    res.render('index',
        {
          title: 'AlGDock',
          partials: {header: 'header', footer: 'footer'},
          user: req.cookies.user
        });
});

// Protein selection page - added by Iva
router.get('/proteins', function(req, res, next) {
	res.render('protein-selection',
      {
        title: 'AlGDock | Protein Selection',
        partials: {header: 'header', footer: 'footer'},
        user: req.cookies.user
      });
});

// Ligand Library selection page - added by Pedro
router.get('/ligandLibrary', function(req, res, next) {
  res.render('ligand-library',
      {
        title: 'AlGDock | Ligand Library Selection',
        partials: {header: 'header', footer: 'footer'},
        user: req.cookies.user
      });
});

// About Us page - added by Pedro
router.get('/about', function(req, res, next) {
  res.render('about',
      {
        title: 'AlGDock | About Us',
        partials: {header: 'header', footer: 'footer'},
        user: req.cookies.user
      });
});

// Smiles SVG Image

router.get('/getSvg/:lineNumber/:smiles', function(req, res) {
    var lineNumber = req.params.lineNumber;
    var smilesStr = req.params.smiles;
    var child_proc = exec('obabel -:"' + smilesStr + '" -xP 80 -O public/svg/' + lineNumber + '.svg');
    child_proc.stdout.pipe(process.stdout);
    child_proc.on('exit', function() {
	res.sendFile(path.join(__dirname, '../public/svg', lineNumber + '.svg'));
    });
});

// Login and Registration
router.post('/', function(req, res) {
    mongoose.model('peoples').findOne({people_username : req.body.login_mail}, function(err, peoples) {

		if (peoples === null) {
			console.log(err);
			res.render('login',
      {
        title: 'AlGDock | Login or Register',
        hide_class : '',
        alert_type: 'alert-danger',
        alert: "We're sorry. We could not find a user with those credentials.",
        partials: {header: 'header', footer: 'footer'},
      });
		}
		else if (create_hash(req.body.login_pass) === peoples["people_password"]){
			logged_tok = generate_tok();
			res.cookie('logged_tok', logged_tok);
			res.cookie('user', peoples["people_username"]);
			peoples["logged_tok"] = logged_tok;
			db_save(peoples);
			res.redirect('/');
		}
		else {
			res.render('login',
      {
        title: 'AlGDock | Login or Register',
        hide_class : '',
        alert_type: 'alert-danger',
        alert: 'Invalid log in.',
        partials: {header: 'header', footer: 'footer'}
      });
		}
    });
});

router.post('/reg', function(req, res, next) {
    var email = req.body.reg_mail;
    mongoose.model('peoples').findOne({people_username : email}, function(err, peoples){
		if(peoples !== null) {
			res.render('login',
      {
        title: 'AlGDock | Login or Register',
        hide_class : '',
        alert_type: 'alert-danger',
        alert: 'This email is already in use. Did you forget your password?',
        partials: {header: 'header', footer: 'footer'}
      });
		}
		else {
			var token = generate_tok();
			var new_people = new People({
			people_username : email,
			people_password : create_hash(req.body.reg_pass2),
			email_verify : token
			});
			db_save(new_people);

			verify_link = 'http://localhost:3000/verify_email/' + email + '/' + token;

			var verifyEmail = {
				from: 'AlGDock Admin <algdock.ipro@gmail.com>',
				to: email,
				subject: 'AlGDock | Email Verification',
				html: 'You are receiving this message because you must verify your email address.<br><br>Just click the link below and you are done!<br>' + '<a href=\"' + verify_link + '\">' + verify_link + '</a>'
			};

			send_mail(verifyEmail);
			res.render('login',
      {
        title: 'AlGDock | Login or Register',
        hide_class : '',
        alert_type: 'alert-success',
        alert : "You have been successfully registered, please verify your email address. An email has been sent to you.",
        partials: {header: 'header', footer: 'footer'}
      });
		}
	});
});

router.get('/verify_email/:email/:tok', function(req, res) {
    mongoose.model('peoples').findOne({people_username : req.params.email}, function(err, peoples){
	if (peoples["email_verify"] === req.params.tok){
	    peoples.last_login = Date.now();
	    db_save(peoples);

	    res.render('login',
      {
        title: 'AlGDock | Login or Register',
        hide_class: '',
        alert_type: 'alert-success',
        alert : 'Your email has been successfully verified. You may now log in.',
        partials: {header: 'header', footer: 'footer'}
      });
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
