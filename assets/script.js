var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#weather-container');
var citySearchTerm = document.querySelector('#city-search-term');
var APIKey = "0d9571e1b0c1a878cfe2800320169226";


var formSubmitHandler = function (event) {
  event.preventDefault();

  var username = cityInputEl.value.trim();

  if (username) {
    getUserCity(username);

    weatherContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a City');
  }
};

// var buttonClickHandler = function (event) {
//   var language = event.target.getAttribute('data-language');

//   if (language) {
//     getFeaturedCity(language);

//     cityContainerEl.textContent = '';
//   }
// };

var getUserCity = function (user) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=97.7431&lon=30.2672&appid=0d9571e1b0c1a878cfe2800320169226';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayCity(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to the Weather');
    });
};

var getFeaturedCity = function (language) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=97.7431&lon=30.2672&appid=0d9571e1b0c1a878cfe2800320169226';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayCity(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayCity = function (repos, searchTerm) {
  if (city.length === 0) {
    cityContainerEl.textContent = 'City not found.';
    return;
  }

  citySearchTerm.textContent = searchTerm;

  for (var i = 0; i < city.length; i++) {
    var cityName = city[i].owner.login + '/' + city[i].name;

    var cityEl = document.createElement('a');
    cityEl.classList = 'list-item flex-row justify-space-between align-center';
    cityEl.setAttribute('href', './single-repo.html?repo=' + cityName);

    var titleEl = document.createElement('span');
    titleEl.textContent = cityName;

    cityEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (city[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + city[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    cityEl.appendChild(statusEl);

    cityContainerEl.appendChild(cityEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
