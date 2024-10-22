import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FavoritesPage.css'; 

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/users/{username}/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(response.data);
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (city) => {
    const token = localStorage.getItem('token');
    await axios.delete('http://localhost:3000/users/{username}/favorites', {
      headers: { Authorization: `Bearer ${token}` },
      data: { city },
    });
    setFavorites(favorites.filter((fav) => fav !== city));
  };

  return (
    <div className="container">
      <h2>Обрані міста</h2>
      {favorites.length ? (
        favorites.map((city, index) => (
          <div key={index} className="favorite-item">
            <span>{city}</span>
            <button onClick={() => removeFavorite(city)}>Видалити</button>
          </div>
        ))
      ) : (
        <p>У вас немає обраних міст</p>
      )}
    </div>
  );
};

export default FavoritesPage;