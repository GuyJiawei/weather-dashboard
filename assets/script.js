
var searchButton = document.querySelector('#search-button');
var searchBox = document.querySelector('#cityInput');
let currentSearch;



// Select the main div where the weather data will be displayed
var currentDayForecast = document.querySelector('#currentDay');

var fiveDayForecast = document.querySelector('#fiveDayForecast')

// API key for OpenWeatherAPI
const apiKey = '55ab61f0ac1d88b3323d821a4a63366f';

function saveSearch() {
  var searchHistory;
  //redefines global variable currentSearch
  currentSearch = document.querySelector("#cityInput").value;
  localStorage.setItem("currentSearch", currentSearch);
  if (localStorage.getItem('searchhistory')) {
    searchHistory = [localStorage.getItem('searchhistory')];
  } else {
    searchHistory = ['Sydney'];
  }
  console.log(searchHistory);
  searchHistory.unshift(currentSearch);
  localStorage.setItem("searchhistory", searchHistory);
  getWeatherApi();
}

searchButton.addEventListener('click', saveSearch);{
}

// Fetch weather data for each city in the list
function getWeatherApi() {

    // Fetch latitude and longitude for each city
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${currentSearch}&limit=1&appid=${apiKey}`)
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
                <img src='https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png' alt=${data.list[0].weather[0].description}''>
                <p class="card-text">Currently in ${data.city.name}, it feels like ${Math.trunc(data.list[0].main.feels_like)}°C</p>
                <p class="card-text">Wind: ${Math.trunc(data.list[0].wind.speed)}KPH</p>
                <p class="card-text">Humidity: ${data.list[0].main.humidity}%</p>
              </div>
            </div>`
            
            // Append the weatherElDiv data to the mainWeatherDiv
            currentDayForecast.append(weatherElDiv);

        // Create a new div to display the weather data
        var fiveDayElDiv = document.createElement('div');

        // Populate the div with a template literal and expressions to populate each cities info
        fiveDayElDiv.innerHTML = `
        <div class="card-group">
          <div class="card">
            <div class="card-body">
              <p class="card-text">${data.list[9].dt_txt}</p>
              <img src='https://openweathermap.org/img/w/${data.list[9].weather[0].icon}.png' alt=${data.list[9].weather.description}''>
              <p class="card-text">Temp: ${Math.trunc(data.list[9].main.feels_like)}°C</p>
              <p class="card-text">Wind: ${Math.trunc(data.list[9].wind.speed)}KPH</p>
              <p class="card-text">Humidity: ${data.list[9].main.humidity}%</p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <p class="card-text">${data.list[17].dt_txt}</p>
              <img src='https://openweathermap.org/img/w/${data.list[17].weather[0].icon}.png' alt=${data.list[17].weather.description}''>
              <p class="card-text">Temp: ${Math.trunc(data.list[17].main.feels_like)}°C</p>
              <p class="card-text">Wind: ${Math.trunc(data.list[17].wind.speed)}KPH</p>
              <p class="card-text">Humidity: ${data.list[17].main.humidity}%</p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <p class="card-text">${data.list[25].dt_txt}</p>
              <img src='https://openweathermap.org/img/w/${data.list[25].weather[0].icon}.png' alt=${data.list[25].weather.description}''>
              <p class="card-text">Temp: ${Math.trunc(data.list[25].main.feels_like)}°C</p>
              <p class="card-text">Wind: ${Math.trunc(data.list[25].wind.speed)}KPH</p>
              <p class="card-text">Humidity: ${data.list[25].main.humidity}%</p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <p class="card-text">${data.list[33].dt_txt}</p>
              <img src='https://openweathermap.org/img/w/${data.list[33].weather[0].icon}.png' alt=${data.list[33].weather.description}''>
              <p class="card-text">Temp: ${Math.trunc(data.list[33].main.feels_like)}°C</p>
              <p class="card-text">Wind: ${Math.trunc(data.list[33].wind.speed)}KPH</p>
              <p class="card-text">Humidity: ${data.list[33].main.humidity}%</p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <p class="card-text">${data.list[39].dt_txt}</p>
              <img src='https://openweathermap.org/img/w/${data.list[39].weather[0].icon}.png' alt=${data.list[39].weather.description}''>
              <p class="card-text">Temp: ${Math.trunc(data.list[39].main.feels_like)}°C</p>
              <p class="card-text">Wind: ${Math.trunc(data.list[39].wind.speed)}KPH</p>
              <p class="card-text">Humidity: ${data.list[39].main.humidity}%</p>
            </div>
          </div>
        </div>`
        
        // Append the fiveDayForecast data to the fiveDayElDiv
        fiveDayForecast.append(fiveDayElDiv);
    })
};