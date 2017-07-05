const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()


// Middleware telling Express to serve files from the public folder
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(3000, function() {
    console.log("Listening on Andre 3000")
});

app.post('/', function(req, res) {
    addEmailToMailchimp(req.body.email);
    res.end('success!!!');
} );

function addEmailToMailchimp(email) {
    var request = require("request");
    var options = {
        method: 'POST',
        url: process.env.MAILCHIMP_LIST,
        headers: {
            'postman-token': process.env.POSTMAN_TOKEN,
            'cache-control': 'no-cache',
            authorization: 'Basic YW55c3RyaW5nOjRlZTJmY2YxMDZiMzAxZjUzMjA0NjM0MjJmZGEzMGQ2LXVzMTY='
        },
        body: {
            email_address: email,
            status: 'subscribed'
        },
        json: true
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });

}
