import React, { useState } from 'react';
import './MiApi.css';

import Buscador from './Buscador';

import search_icon from '../assets/imgs/search.png';
import clear_icon from '../assets/imgs/clear.png';
import cloud_icon from '../assets/imgs/cloud.png';
import drizzle_icon from '../assets/imgs/drizzle.png';
import humidity_icon from '../assets/imgs/humidity.png';
import rain_icon from '../assets/imgs/rain.png';
import snow_icon from '../assets/imgs/snow.png';
import wind_icon from '../assets/imgs/wind.png';


export default function MiApi() {
  let api_key = "a0c725d12a4e1dd03bd5c6ac934ea5b4";

  const [wicon, setWicon] = useState(cloud_icon);
  const [weatherData, setWeatherData] = useState({
    humidity: '90%',
    windSpeed: '2 km/h',
    temperature: '6°C',
    location: 'Talca',
  });

 
  const updateWeatherData = (data) => {
    setWeatherData({
      humidity: data.main.humidity + " %",
      windSpeed: Math.floor(data.wind.speed) + " km/h",
      temperature: Math.floor(data.main.temp) + " °C",
      location: data.name,
    });

    //Imagen de acuerdo al clima mostrado
    if (data.weather[0].icon === "01d" || data.weather[0] === "01n") {
      setWicon(clear_icon);
    } else if (data.weather[0].icon === "02d" || data.weather[0] === "02n") {
      setWicon(cloud_icon);
    } else if (data.weather[0].icon === "03d" || data.weather[0] === "03n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon === "04d" || data.weather[0] === "04n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon === "09d" || data.weather[0] === "09n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "10d" || data.weather[0] === "10n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "13d" || data.weather[0] === "13n") {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };

  //Busqueda por ciudad
  const search = async (city) => {
    if (city === "") {
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      updateWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  return (
    <div className='container'>
      <Buscador onSearch={search} />
      <div className='weather-image'>
        <img src={wicon} alt="" />
      </div>
      <div className='weather-temp'>{weatherData.temperature}</div>
      <div className='weather-location'>{weatherData.location}</div>
      <div className='data-container'>
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}