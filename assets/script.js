
var userFormEl = document.querySelector('#user-form');
var cityInput = document.querySelector('#city');
var weatherContainer = document.querySelector('#weather-container');
var citySearchTerm = document.querySelector('#city-search-term');
// const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const APIKey = "0d9571e1b0c1a878cfe2800320169226";
const city = '';
const fivedayforecast = document.getElementById('fivedayforecast');
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
    get5DayForcast(lat, lon);
    // return data;
  })
  .catch(function (error) {
    console.error(error);
  })
};

var displayCurrentWeather = function (data, city) {
  // console.log(city);
  // console.log(data);
  // console.log(data.main.temp);

  var currentDay = dayjs.unix(data.dt).format("MM/DD/YYYY");
  // console.log(currentDay);

  citySearchTerm.textContent = city + " " + currentDay;

  var tempEl = document.createElement('p');
  tempEl.textContent = "Temperature: " + data.main.temp;
  weatherContainer.appendChild(tempEl);

  var windEl = document.createElement('p');
  windEl.textContent = "Wind Speed: " + data.wind.speed + " MPH";
  weatherContainer.appendChild(windEl);

  var humidityEl = document.createElement('p');
  humidityEl.textContent = "Humidity: " + data.main.humidity  + " %";
  weatherContainer.appendChild(humidityEl);    
  };



   var get5DayForcast = function(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial')
    .then( function (response) {
      return response.json();
    })
    .then (function (data) {
      console.log(data);
      for (let i = 7; i < data.list.length; i+=8) {
        console.log(data.list[i]);
        const forecast = data.list[i];
        const dateTime = dayjs.unix(data.list[i].dt).format("MM/DD/YYYY");
        const temperature = forecast.main.temp;
        const windSpeed = data.list[i].wind.speed;
        const humidity = data.list[i].main.humidity;
        console.log(humidity);
        // console.log('Date/Time:', dateTime);
        // console.log('Temperature:', temperature);
        const container = document.createElement('div');
        const dayEl = document.createElement('p');
        dayEl.textContent = "Date: " + dateTime;
        const tempEl = document.createElement('p');
        tempEl.textContent = "Temperature: " + temperature;
        const windEl = document.createElement('p');
        windEl.textContent = "Wind Speed: " +windSpeed;
        const humidityEl = document.createElement('p');
        humidityEl.textContent = "Humidity: " + humidity;
        container.appendChild(dayEl);
        container.appendChild(tempEl);
        container.appendChild(windEl);
        container.appendChild(humidityEl);
        fivedayforecast.appendChild(container);


      }
    })
  };
  
  // var displayForecast = function (forecast) {
  //   console.log(forecast);""
  // }
  

userFormEl.addEventListener('submit', formSubmitHandler);