import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CityAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      const fetchCities = async () => {
        // додати .env файл з apikey 
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/find?q=${query}&appid=7dfd0a1371b0ee68ad22712549d4359a&limit=5`
        );
        setSuggestions(response.data.list);
      };
      fetchCities();
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введіть назву міста"
      />
      <ul>
        {suggestions.map((city) => (
          <li key={city.id} onClick={() => onSelect(city)}>
            {city.name}, {city.sys.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityAutocomplete;