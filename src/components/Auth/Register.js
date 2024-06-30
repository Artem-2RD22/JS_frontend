import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [username, setUsername] = useState(''); // Состояние для имени пользователя
  const [password, setPassword] = useState(''); // Состояние для пароля
  const [name, setName] = useState(''); // Состояние для имени
  const [phone, setPhone] = useState(''); // Состояние для телефона
  const navigate = useNavigate();
  const [error, setError] = useState(null); // Состояние для ошибки

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3333/auth/register', { 
        username, 
        password, 
        first_name: name, 
        phone, 
        role_id: 2 // роль пользователя
      });
      navigate('/login'); // Перенаправление на страницу логина после успешной регистрации
    } catch (error) {
      setError('Registration failed'); // Установка ошибки
      console.error('Error registering', error);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} className={styles.registerForm}>
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
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.registerButton}>Register</button>
      </form>
    </div>
  );
};

export default Register;
