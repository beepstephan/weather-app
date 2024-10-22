import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/users/register', {
        username,
        password,
      });
      alert('Реєстрація успішна!');
    } catch (error) {
      console.error('Помилка реєстрації:', error);
      alert('Йой, шось пішло не так');
    }
  };

  return (
    <div className="container">
      <h2>Реєстрація</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

export default Register;