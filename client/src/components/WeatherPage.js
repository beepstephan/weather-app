import React, { useState } from 'react';
import CityAutocomplete from './CityAutocomplete';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import './WeatherPage.css'; 

const WeatherPage = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = (city) => {
    setSelectedCity(city.name);
  };

  return (
    <div className="container">
      <CityAutocomplete onSelect={handleCitySelect} />
      {selectedCity && (
        <div>
          <WeatherCard city={selectedCity} />
          <WeatherChart city={selectedCity} />
        </div>
      )}
    </div>
  );
};

export default WeatherPage;