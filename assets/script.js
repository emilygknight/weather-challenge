var userFormEl = document.querySelector('#user-form');
var cityInput = document.querySelector('#city');
var weatherContainer = document.querySelector('#weather-container');
var citySearchTerm = document.querySelector('#city-search-term');
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
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




var displayCity = function (data, weather) {

  citySearchTerm.textContent = city;

  for (var i = 0; i < city.length; i++) {

    var cityEl = document.createElement('a');
    cityEl.classList = 'list-item flex-row justify-space-between align-center';
    cityEl.setAttribute('href', 'https://api.openweathermap.org/data/2.5/weather?q=' + city.data + '&appid=' + APIKey);

    var titleEl = document.createElement('span');
    titleEl.textContent = cityInput;

    cityEl.appendChild(titleEl);
    weatherContainer.appendChild(cityEl);
  }


console.log(city);
console.log(weather);
console.log(data);
}

};

userFormEl.addEventListener('submit', formSubmitHandler);