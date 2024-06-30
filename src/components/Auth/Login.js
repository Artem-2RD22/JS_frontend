import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/actions/authActions';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState(''); // Состояние для имени пользователя
  const [password, setPassword] = useState(''); // Состояние для пароля
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null); // Состояние для ошибки

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3333/auth/login', { username, password });
      localStorage.setItem('token', response.data.token); // Сохранение токена в localStorage
      dispatch(setUser(response.data.user)); // Сохранение пользователя в Redux
      navigate('/'); // Перенаправление на главную страницу
    } catch (error) {
      setError('Invalid username or password'); // Установка ошибки
      console.error('Error logging in', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
    </div>
  );
};

export default Login;
