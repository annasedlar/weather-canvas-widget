$(document).ready(function(){

	$('#weather-form').submit(function(){
			//stop the form from submitting!
			event.preventDefault();
			// input field has id of location, go get input
			var location = $('#location').val();
			var weatherURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip="+location+",us&appid="+apiKey;
			console.log(weatherURL);
		$.getJSON(weatherURL, function(weatherData){
			console.log(weatherData);
			var currTemp = weatherData.main.temp;
			var city = weatherData.name;
			var icon = 'openweathermap.org/img/w/'+weatherData.weather[0].icon + '.png';
			var cityID = weatherData.id;
			$('#currTemp').html("The current temperature in " + city + " is " + currTemp+ " degrees Fahrenheit");
			var canvas = $('#weather-canvas');
			var context = canvas[0].getContext('2d');
			// console.log(context);
			//set up the outer circle
			var currPercent = 0;
			function animate(current){
				context.fillStyle = "#ccc";
				context.beginPath();
				context.arc(155, 75, 65, Math.PI*0, Math.PI*2)
				context.closePath();
				context.fill();

				//draw outer line
				context.lineWidth =10; //make thick outer line
				context.strokeStyle = "#3c92a3";
				context.beginPath();
				context.arc(155, 75, 70, Math.PI*1.5, (Math.PI*2*current) + Math.PI*1.5);
				context.stroke(); //we want a line, not fill();
				currPercent ++;
				if(currPercent < currTemp){
					requestAnimationFrame(function(){
						animate(currPercent / 100);
						});
				}
				context.lineWidth = 3
				context.font = "50px Arial";
				context.strokeText(currTemp, 110, 85);
			}
			if(weatherData.clouds.all > 50){
				$('#icon').append("<img src='"+icon+"'>");
				console.log();
			}

			$('#graph').prepend(animate());
			forecastURL = "http://api.openweathermap.org/data/2.5/forecast/daily?id="+cityID+"&units=imperial&appid="+apiKey;
			$.getJSON(forecastURL, function(forecastData){
			// console.log(forecastData);
			// console.log(forecastURL);

		})
		});

	});


});
