
var searchButton = document.getElementById("search-button");

let cityTarget;



// Select the main div where the weather data will be displayed
var currentDayForecast = document.getElementById('currentDay');

var fiveDayForecast = document.getElementById("fiveDayForecast")

// API key for OpenWeatherAPI
const apiKey = "55ab61f0ac1d88b3323d821a4a63366f";

searchButton.click(function(event){
  event.preventDefault();
  cityTarget = $("#cityInput").val().trim();
  localStorage.setItem("city", cityTarget);
  getWeatherApi();
});

// Fetch weather data for each city in the list
function getWeatherApi() {

    // Fetch latitude and longitude for each city
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityTarget}&limit=1&appid=${apiKey}`)
      .then(function(response) {

        // Convert the response to JSON format
        return response.json();
      })
      .then(function(data) {

        // Extract the lat and lon from the data
        var lat = data[0].lat;
        var lon = data[0].lon;

        // Second function call to fetch the weather data fort the city using the lat and lon
        secondFetch(lat,lon);
      })
};

// Fetch weather data for a city using its lat and lon  
function secondFetch(lat, lon) {

  // URL to fetch weather data
  var weatherData = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  fetch(weatherData)
    .then(function(response){

        // converrt response to JSON format
        return response.json();
    })
    .then(function (data){
        console.log(data);

        // Create a new div to display the weather data
        var weatherElDiv = document.createElement('div');

            // Populate the div with a template literal and expressions to populate each cities info
            weatherElDiv.innerHTML = `
            <div class="card">
              <h5 class="card-header">${data.city.name}</h5>
              <div class="card-body">
                <img src='https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png' alt=${data.list[0].weather.description}''>
                <p class="card-text">Currently in ${data.city.name}, it feels like ${Math.trunc(data.list[0].main.feels_like)}°C</p>
                <p class="card-text">Wind: ${Math.trunc(data.list[0].wind.speed)}KPH</p>
                <p class="card-text">Humidity: ${data.list[0].main.humidity}%</p>
              </div>
            </div>`
            
            // Append the weatherElDiv data to the mainWeatherDiv
            currentDayForecast.append(weatherElDiv);
    })
};