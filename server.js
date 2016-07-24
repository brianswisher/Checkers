// Module dependencies.
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var io = require('socket.io').listen(server);

console.log(__dirname+'/app/controllers');
app.use(express.static(__dirname + '/app/controllers'));
app.use('/views',express.static(__dirname + '/app/views'));
app.use(express.static(__dirname + '/app/css'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-ui-bootstrap/dist'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-route'));
app.use('/board', express.static(__dirname + '/app/board/js'));
app.use('/styles', express.static(__dirname + '/app/board/css'));
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/styles', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts'))
app.use('/images', express.static(__dirname + '/app/board/img/chesspieces/wikipedia'));
app.use('/scripts', express.static(__dirname + '/node_modules/socket.io-client/'));
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap-validator/dist'));
app.use(express.static(__dirname + '/app/services'));

connections = [];
users = []

//socket.io
io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf((socket)), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    })

    socket.on('send message', function(data) {
        io.sockets.emit('new message', {msg: data});
    })
});

//end of socket.io

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/index.html')
});

function logger(req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
}

app.use(logger);

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/app/views/Match.html')
}); 

server.listen(3000 || process.env.PORT, function() {
	console.log('Server listening on localhost');
	console.log('Type localhost on your browser, there\'s no more port!');
});


