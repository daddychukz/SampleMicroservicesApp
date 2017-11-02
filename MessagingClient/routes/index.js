'use strict';
var express = require('express');
var http = require("http");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Messaging Client', socketHost: process.env.socketHost});
});

router.post('/messages', function (req, res) {
    var body = JSON.stringify(req.body.message);
    var options = {
        host: process.env.messagingAPI || "localhost",
        port: 3000,
        path: '/api/messages',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length
        }
    };

    try {
        var restRequest = http.request(options, function (httpResponse) {
        });
        restRequest.write(body);
        restRequest.end();
    } catch(e) {
        res.send('Error in posting message to API!');
    }

    res.send('Message posted successfully!')
});

module.exports = router;
