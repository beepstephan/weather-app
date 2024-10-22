import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherCard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      // додати .env файл з apikey 
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7dfd0a1371b0ee68ad22712549d4359a&units=metric`
      );
      setWeather(response.data);
      setLoading(false);
    };

    fetchWeather();
  }, [city]);

  if (loading) return <p>Завантаження...</p>;

  return (
    <div>
      <h3>{weather.name}, {weather.sys.country}</h3>
      <p>Температура: {weather.main.temp}°C</p>
      <p>Туманність: {weather.main.humidity}%</p>
      <p>Швидкість вітру: {weather.wind.speed} м/с</p>
    </div>
  );
};

export default WeatherCard;