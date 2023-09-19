var userFormEl = document.querySelector('#user-form');
var cityInput = document.querySelector('#city');
var weatherContainer = document.querySelector('#weather-container');
var citySearchTerm = document.querySelector('#city-search-term');
// const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const APIKey = "0d9571e1b0c1a878cfe2800320169226";
const city = '';

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

  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey)
   .then( function (response) {
    console.log(response);
     return response.json();
  })
  .then (function (data) {
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    console.log('lat', lat);
    console.log('long', lon);
    displayCity(data.weather, city);
    console.log(data.weather);
    return data;
  })
  .catch(function (error) {
    console.error(error);
  });;




var displayCity = function (data, city) {

  citySearchTerm.textContent = city;

    cityName = document.createElement('a');
    cityName.classList = 'list-item flex-column justify-space-between align-center';
    cityName.setAttribute('href', 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey);

    var titleEl = document.createElement('span');
    titleEl.textContent = "Click here for Weather";

    cityName.appendChild(titleEl);
    weatherContainer.appendChild(cityName);
    
    console.log(city);
    console.log(data);
  }
};

// };

userFormEl.addEventListener('submit', formSubmitHandler);