#!/bin/sh

USER=$1
PASS=$2

cat << EOF
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '$USER',
        pass: '$PASS'
    }
});

module.exports = transporter;
EOF
