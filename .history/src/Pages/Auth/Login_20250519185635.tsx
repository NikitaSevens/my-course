import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';
import { ReactComponent as ExitIcon } from '../../assets/icons/exit.svg';


const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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
        <div className={styles.header}>
          <h2 className={styles.title}>Вход в админку</h2>
          <button type="button" className={styles.exit} onClick={() => navigate('/')}>
            На главную
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <label className={styles.field}>
          Логин
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.field}>
          Пароль
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className={styles.submit}>Войти</button>
      </form>
    </div>
  );
};

export default Login;
