import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const WeatherChart = ({ city }) => {
  const [chartData, setChartData] = useState(null);
  const [viewMode, setViewMode] = useState('day'); 

  useEffect(() => {
    const fetchWeatherData = async () => {
      // також додати .env файл з apikey 
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/${viewMode === 'day' ? 'weather' : 'forecast'}?q=${city}&appid=7dfd0a1371b0ee68ad22712549d4359a&units=metric`
      );

      const data = viewMode === 'day'
        ? [response.data.main.temp]
        : response.data.list.slice(0, 5).map((data) => data.main.temp);

      setChartData({
        labels: viewMode === 'day' ? ['Today'] : ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        datasets: [
          {
            label: 'Temperature (°C)',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      });
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city, viewMode]);

  return (
    <div>
      <button onClick={() => setViewMode(viewMode === 'day' ? '5days' : 'day')}>
        {viewMode === 'day' ? 'Показати прогноз на 5 днів' : 'Показати прогноз на сьогодні'}
      </button>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p>Завантаження графіку...</p>
      )}
    </div>
  );
};

export default WeatherChart;