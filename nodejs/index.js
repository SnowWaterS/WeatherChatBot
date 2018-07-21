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

var weather = require('openweather-apis');

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

weather.setLang('en');
weather.setCity('Dublin');
weather.setUnits('metric');
weather.setAPPID('---APPID---');

app.post('/message', function(req, res){
	var message = '';
	weather.getAllWeather(function(err, JSONObj){
		console.log(JSONObj);
		message = message + JSONObj.main.temp;
		console.log(message);
		res.json({message:message});
	});
});

var port = app.get('port');
console.log('Listen port: %d', port);
app.listen(port);

