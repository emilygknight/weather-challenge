var userFormEl = document.querySelector('#user-form');
var cityInput = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#weather-container');
var citySearchTerm = document.querySelector('#city-search-term');
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const APIKey = "0d9571e1b0c1a878cfe2800320169226";
// const description = weatherData.main.temp;

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInput.value.trim();

  if (city) {
    getUserCity(city);

    weatherContainerEl.textContent = '';
    cityInput.value = '';
  } else {
    alert('Please enter a City');
  }
};

var getUserCity = function (city) {
  // var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;

  // fetch(queryUrl)
  //   .then(function (response) {
  //     if (response.ok) {
  //       console.log(response);
  //       response.json()
  //        .then(function (data) {
  //         console.log(data);
  //         console.log(data.weather);
  //         displayCity(data.weather, city);
  //       });
  //     } else {
  //       alert('Error: ' + response.statusText);
  //     }
  //   })
  //   .catch(function (error) {
  //     alert('Unable to connect to the Weather');
  //     console.log(error);
  //   });
  //   console.log(city);
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey)
   .then( function (response) {
     return response.json();
  })
  .then (function (data) {
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    console.log('lat', lat);
    console.log('long', lon);
    displayCity(data.weather, city);
    return data;
  });




var displayCity = function (city, weather) {

console.log(city, weather);
console.log(city);
console.log(weather);
}

};

userFormEl.addEventListener('submit', formSubmitHandler);