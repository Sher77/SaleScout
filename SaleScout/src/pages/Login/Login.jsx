import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setUser, setIsLoggedIn } from '../../redux/slices/UserSlice';

import axios from 'axios';

import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import InputPassword from '../../components/InputPassword/InputPassword';
import LangDropdown from '../../components/LangDropdown/LangDropdown';

import styles from './Login.module.scss';

const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkboxRef = React.useRef();
  const [error, setError] = React.useState('');
  const [formData, setFormData] = React.useState({
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/login`, formData);
      setFormData({ phone: '', password: '' });
      // console.log('Response:', response.data);
      dispatch(setIsLoggedIn(true));
      dispatch(setUser({ ...response.data.data }));

      if (checkboxRef.current.checked) {
        function saveUserData() {
          localStorage.setItem(
            'user',
            JSON.stringify({ ...response.data.data })
          );
        }

        saveUserData();
      } else {
        localStorage.clear();
      }

      return navigate('/');
    } catch (error) {
      console.error('Ошибка отправки данных формы:', error);
      setError(
        error?.response?.data?.message || 'Ошибка отправки данных формы'
      );
    }
  };

  return (
    <section className={styles.login}>
      <header className={styles.header}>
        <div className="container">
          <LangDropdown />
        </div>
      </header>
      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>SaleScout</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <p className={styles.heading}>Вход в аккаунт</p>
            <label className={styles.label}>
              Номер телефона
              <Input
                placeholder="+7(___) __ ___"
                name="phone"
                required
                type="text"
                needMask={true}
                value={formData.phone}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              <InputPassword
                placeholder="Введите пароль"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.additional}>
              <label className={styles.checkbox}>
                <input
                  className="visually-hidden"
                  type="checkbox"
                  name="remember-me"
                  defaultChecked
                  ref={checkboxRef}
                />
                <span className={styles.checkboxIcon}></span>
                <span className={styles.checkboxText}>Запомнить меня</span>
              </label>
              <Link className={styles.forgotPassword} to="/forget-password">
                Забыли пароль?
              </Link>
            </div>
            <Button type="submit">Войти</Button>
            <p className={styles.noaccount}>
              <span>Нет аккаунта?</span>
              <Link to="/registration">Зарегистрироваться</Link>
            </p>
          </form>
        </div>
      </main>
    </section>
  );
};

export default Login;
