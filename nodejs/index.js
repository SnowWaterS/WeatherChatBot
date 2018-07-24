/*
 * kakao chatbot
 *
 *
 * Weather info is collected and is sent to clients.
 *
 */

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');

global.app = express();
global.async = require('async');


app.set('port', process.env.NODE_PORT || 8080);
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(serveStatic('public', {'index': ['index.html', 'index.htm']}));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/keyboard', function(req, res) {
	res.json({type:'text'});
});

require('./libs/message')(app);

var port = app.get('port');
console.log('Listen port: %d', port);
app.listen(port);

