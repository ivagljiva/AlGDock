// Schema for a new user

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var peopleSchema = new Schema({
    people_username : String,
    people_password : String,
    account_created : { type: Date, default: Date.now() },
    last_login : { type : Date, default: null },
    email_verify : {type : String, default : null },
    logged_tok: {type : String, default: null}
});

module.exports = mongoose.model('peoples', peopleSchema);
