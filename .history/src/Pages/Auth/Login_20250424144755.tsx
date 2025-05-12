import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(form.username, form.password)) {
      navigate('/admin', { replace: true });
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Вход в админку</h2>
        <button onClick={() => navigate('/register')}>Вы</button>
        {error && <div className={styles.error}>{error}</div>}

        <label>
          Логин
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Пароль
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button  type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
