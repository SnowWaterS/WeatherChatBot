'use strict'

var weather = require('openweather-apis');

module.exports = function(app) {

	if(!app) {
		return;
	}

	weather.setLang('en');
	weather.setCity('Dublin');
	weather.setUnits('metric');
	weather.setAPPID('---APPID---');

	app.post('/message', function(req, res){
		weather.getAllWeather(function(err, JSONObj){
			var weatherInfo = JSONObj.weather[0].main;
			var descInfo = JSONObj.weather[0].description;
			var cloudsInfo = JSONObj.clouds.all;
			var tempInfo = JSONObj.main.temp;
			var humidInfo = JSONObj.main.humidity;
			var windInfo = JSONObj.wind.speed;
			var imageURL = "http://openweathermap.org/img/w/"+JSONObj.weather[0].icon+".png";
			var text = 'The current weather is:\n'
				+'Weather\t\t'+ weatherInfo + '\n'
				+'Description\t'+ descInfo + '\n'
				+'Temperature\t'+ tempInfo + '°c\n'
				+'Wind\t\t'+ windInfo + 'm/s\n'
				+'Clouds\t\t'+ cloudsInfo + '%\n'
				+'Humidity\t\t'+ humidInfo + '%\n';
			var message = {text:text, photo:{url:imageURL, width:300, height:300}};
			res.json({message:message});
		});
	});

};
