import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import WeatherBlocks from './components/WeatherBlocks';
import FavoritesPage from './components/FavoritesPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  // додати головну сторінку
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/favorites"
          element={isAuthenticated ? <FavoritesPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/weather"
          element={isAuthenticated ? <WeatherBlocks /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;