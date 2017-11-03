'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var azure = require('azure');
var serviceBusService = azure.createServiceBusService(process.env.serviceBusConnectionString);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 80);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

var io = require('socket.io')(server);
var allConnections = [];
var timerInstance;
io.sockets.on('connection', function (socket) {
    allConnections.push(socket);
    if(!timerInstance) {
        var receiveMessage = function () {
            try {
                serviceBusService.receiveSubscriptionMessage(process.env.topicName, process.env.subscriptionName, function (error, receivedMessage) {
                    if (!error) {
                        for(var connection in allConnections){
                            allConnections[connection].emit('receiveMessage', { message: receivedMessage.body });
                        }
                        
                    }
                });
            } catch (e) {
            }
            timerInstance = setTimeout(receiveMessage, 1000);
        };
        receiveMessage();
    }
    socket.on('disconnect', function() {
        var socketIndex = allConnections.indexOf(socket);
        if(allConnections.length > socketIndex){
            allConnections.splice(socketIndex, 1);
        }
     });
});





