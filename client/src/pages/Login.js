import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      onLogin();
    } catch (error) {
      console.error('Помилка авторизації:', error);
      alert('Неправильний логін або пароль');
    }
  };

  return (
    <div className="container">
      <h2>Авторизація</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Логін"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default Login;