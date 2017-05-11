var MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || require('./config/config.js').MAILGUN_API_KEY;
var MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || require('./config/config.js').MAILGUN_DOMAIN;
var Mailgun = require('mailgun-js');

var mailgun = new Mailgun({apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN});

// var data = {
//   from: 'test@example.com',
//   to: 'test@gmail.com',
//   subject: 'Hello from Mailgun',
//   html: 'Here we go again... Jessica Alba number 1'
// };

var sendEmail = function(data) {
  mailgun.messages().send(data, function (err, body) {
    if (err) {
        console.log("Error with your email message: ", err);
    }
    else {
        console.log(body);
    }
  });
};

export.modules.sendEmail = sendEmail;