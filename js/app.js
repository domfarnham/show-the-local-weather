// Take users location
// display description of current weather
// 	- Fahrenheit and Celsius
// 	-  a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
// 	- A button to toggle between Fahrenheit and Celsius

var celsius = 7;
var fahrenheit = 47;

// getRequest function
function getRequest(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function processRequest(e) {
		
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log("getRequest status code : " + xhr.status);	
			var response = JSON.parse(xhr.responseText);
			console.log("response is : " + JSON.stringify(response));
			callback(response);
		}
	}
	xhr.open('GET', url, true);
	// xhr.withCredentials = true;
	xhr.setRequestHeader("Content-Type", "application/json");
	// xhr.setRequestHeader('Authorization', 'Basic '); // Can use btoa('myUsrName:myPwd')
	xhr.send();
}

// Take users location
var getLocation = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
    // document.getElementById("weatherContainer").innerHTML = "latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude;
  	});
	}
};
getLocation();

// Get Weather
var getWeather = function() {
	console.log("getWeather called");
	var request = "http://api.openweathermap.org/data/2.5/weather?lat=51.444609&lon=0.089034&APPID=3f34b77b1cb418f8c5a3662d5a7e2ef0";
	getRequest(request, updateWeather);
};

var updateWeather = function(data) {
	celsius = Math.round(data.main.temp - 273.15);
	fahrenheit = Math.round(celsius * 9 / 5 + 32);
	console.log("fahrenheit is : " + fahrenheit);
	console.log("celsius is : " + celsius);
	console.log("updateWeather called");
	console.log("temperature is : " + data.main.temp);
	document.getElementById("cityName").innerText = data.name + ", " + data.sys.country;
	document.getElementById("description").innerText = titleCase(data.weather[0].description);
	document.getElementById("icon").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>";
	document.getElementById("temperature").innerText = celsius;
	document.getElementById("measurement").innerText = "C";
};

var toggleMeasurement = function() {
	if (temperature.classList.contains("celsius")) {
		document.getElementById("temperature").innerHTML = fahrenheit;
		document.getElementById("measurement").innerText = "F";
		document.getElementById("temperatureToggle").innerText = "Celsius";
	} else {
		document.getElementById("temperature").innerHTML = celsius;
		document.getElementById("measurement").innerText = "C";
		document.getElementById("temperatureToggle").innerText = "Fahrenheit";
	}
	temperature.classList.toggle("celsius")
};

function titleCase(str) {
 
  var array = str.split(" ");
  var toUpper = array.map(function(val) {
    return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  });
  
  return toUpper.join(" ");
}

getWeather();
document.getElementById("temperatureToggle").addEventListener("click", toggleMeasurement);
// display description of current weather
// var weather;

// get city name
// maps.googleapis.com/maps/api/geocode/json?latlng=51.444609,0.089034&sensor=true
// jsonObj.fomatted_address

// My openweathermap api key is 3f34b77b1cb418f8c5a3662d5a7e2ef0
// get weather using city name
// api.openweathermap.org/data/2.5/weather?q=London?id=524901&APPID=3f34b77b1cb418f8c5a3662d5a7e2ef0
// api.openweathermap.org/data/2.5/weather?lat=51.444609&lon=0.089034&APPID=3f34b77b1cb418f8c5a3662d5a7e2ef0

// JSON
// Example of API respond:


// {"coord":
// {"lon":145.77,"lat":-16.92},
// "weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],
// "base":"cmc stations",
// "main":{"temp":293.25,"pressure":1019,"humidity":83,"temp_min":289.82,"temp_max":295.37},
// "wind":{"speed":5.1,"deg":150},
// "clouds":{"all":75},
// "rain":{"3h":3},
// "dt":1435658272,
// "sys":{"type":1,"id":8166,"message":0.0166,"country":"AU","sunrise":1435610796,"sunset":1435650870},
// "id":2172797,
// "name":"Cairns",
// "cod":200}


// How to get icon URL
// For code 501 - moderate rain icon = "10d" 
// URL is
// openweathermap.org/img/w/10d.png