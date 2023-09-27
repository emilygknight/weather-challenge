var userFormEl = document.querySelector('#user-form');
var cityInput = document.querySelector('#city');
var weatherContainer = document.querySelector('#weather-container');
var citySearchTerm = document.querySelector('#city-search-term');
// const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const APIKey = "0d9571e1b0c1a878cfe2800320169226";
const city = '';
// dayjs.extend(window.dayjs_plugin_utc);
// dayjs.extend(window.dayjs_plugin_timezone);

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInput.value.trim();

  if (city) {
    getUserCity(city);

    weatherContainer.textContent = '';
    cityInput.value = '';
  } else {
    alert('Please enter a City');
  }
};

var getUserCity = function (city) {

  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey + '&units=imperial')
   .then( function (response) {
    // console.log(response);
     return response.json();
  })
  .then (function (data) {
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    // console.log('lat', lat);
    // console.log('long', lon);
    displayCurrentWeather(data, city);
    displayForcast(lat, lon);
    // console.log(data.weather);
    // console.log(data);
    // return data;
  })
  .catch(function (error) {
    console.error(error);
  })
};

var displayForcast = function (lat, lon) {
  fetch('api.openweathermap.org/data/2.5/forecast?' lat={lat}&lon={lon} '&appid=' + APIKey)
}


var displayCurrentWeather = function (data, city) {
  console.log(city);
  console.log(data);
  console.log(data.main.temp);

  var currentDay = dayjs.unix(data.dt).format("MM/DD/YYYY");
  console.log(currentDay);

  citySearchTerm.textContent = city + currentDay;

  var tempEl = document.createElement('p');
  tempEl.textContent = "temp: " + data.main.temp;
  weatherContainer.appendChild(tempEl);

  var windEl = document.createElement('p');
  windEl.textContent = "wind: " + data.wind.speed + " MPH";
  weatherContainer.appendChild(windEl);

  var humidityEl = document.createElement('p');
  humidityEl.textContent = "humidity: " + data.main.humidity  + " %";
  weatherContainer.appendChild(humidityEl);
    // cityName = document.createElement('a');
    // cityName.classList = 'list-item flex-column justify-space-between align-center';
    // cityName.setAttribute('href', 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey);

    // var titleEl = document.createElement('span');
    // titleEl.textContent = "Click here for Weather";

    // cityName.appendChild(titleEl);
    // weatherContainer.appendChild(cityName);
    
  };

userFormEl.addEventListener('submit', formSubmitHandler);