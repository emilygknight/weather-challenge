import React, { useState, useRef } from 'react';
import dayjs from 'dayjs';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const cityInputRef = useRef(null);
  const weatherContainerRef = useRef(null);
  const citySearchTermRef = useRef(null);
  const fiveDayForecastRef = useRef(null);

  const APIKey = "0d9571e1b0c1a878cfe2800320169226";
  const MAPKey = "356fc63cf1e4adbf3c2c1988a677d051";

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredCity = cityInputRef.current.value.trim();

    if (enteredCity) {
      getUserCity(enteredCity);
      weatherContainerRef.current.textContent = '';
      cityInputRef.current.value = '';
    } else {
      alert('Please enter a City');
    }
  };

  const getUserCity = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`)
      .then(response => response.json())
      .then(data => {
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        displayCurrentWeather(data, city);
        get5DayForecast(lat, lon);
      })
      .catch(error => console.error(error));
  };

  const displayCurrentWeather = (data, city) => {
    const currentDay = dayjs.unix(data.dt).format("MM/DD/YYYY");
    citySearchTermRef.current.textContent = `${city} ${currentDay}`;

    const tempEl = document.createElement('p');
    tempEl.textContent = `Temperature: ${data.main.temp}`;
    weatherContainerRef.current.appendChild(tempEl);

    const windEl = document.createElement('p');
    windEl.textContent = `Wind Speed: ${data.wind.speed} MPH`;
    weatherContainerRef.current.appendChild(windEl);

    const humidityEl = document.createElement('p');
    humidityEl.textContent = `Humidity: ${data.main.humidity} %`;
    weatherContainerRef.current.appendChild(humidityEl);
  };

  const get5DayForecast = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`)
      .then(response => response.json())
      .then(data => {
        for (let i = 7; i < data.list.length; i += 8) {
          const forecast = data.list[i];
          const dateTime = dayjs.unix(data.list[i].dt).format("MM/DD/YYYY");
          const temperature = forecast.main.temp;
          const windSpeed = data.list[i].wind.speed;
          const humidity = data.list[i].main.humidity;

          const container = document.createElement('div');
          const dayEl = document.createElement('p');
          dayEl.textContent = `Date: ${dateTime}`;
          const tempEl = document.createElement('p');
          tempEl.textContent = `Temperature: ${temperature}`;
          const windEl = document.createElement('p');
          windEl.textContent = `Wind Speed: ${windSpeed}`;
          const humidityEl = document.createElement('p');
          humidityEl.textContent = `Humidity: ${humidity}`;

          container.appendChild(dayEl);
          container.appendChild(tempEl);
          container.appendChild(windEl);
          container.appendChild(humidityEl);
          fiveDayForecastRef.current.appendChild(container);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="card">
      <header>
        <h1>Weather</h1>
      </header>

      <main>
        <div className="current-weather">
          <h2>Current Weather: <span ref={citySearchTermRef}></span></h2>
          <div id="weather-container" className="list-group" ref={weatherContainerRef}></div>
        </div>

        <div className="search-card">
          <h2>Search By Location</h2>
          <form id="user-form" className="card-body" onSubmit={formSubmitHandler}>
            <label className="form-label">City:</label>
            <input id="city" className="form-input" ref={cityInputRef} />
            <button type="submit" className='btn'>Submit</button>
          </form>
        </div>

        <div className="forecast">
          <p>This is the 5-day bar forecast for City</p>
          <div id="fivedayforecast" ref={fiveDayForecastRef}></div>
        </div>

        <div className='weather-map'> 
        <img className='map'
          src={`https://tile.openweathermap.org/map/percipitation-new/18/x/y.png?appid=${MAPKey}`}
          alt="Weather Map"/>
        </div>
      </main>
    </div>
  );
};

export default WeatherApp;