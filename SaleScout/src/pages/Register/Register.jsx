import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import axios from 'axios';

import { setUser, setIsLoggedIn } from '../../redux/slices/UserSlice';

import styles from './Register.module.scss';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import LangDropdown from '../../components/LangDropdown/LangDropdown';

import InputPassword from '../../components/InputPassword/InputPassword';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [error, setError] = React.useState();
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    password: '',
    rePassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      setError('Пароли должны быть одинаковые!');
      return;
    } else {
      setError('');
    }

    try {
      const response = await axios.post(`${API_URL}/api/login`, formData);
      setFormData({
        ...formData,
        name: '',
        phone: '',
        password: '',
        rePassword: '',
      });
      // console.log('Response:', response.data);
      dispatch(setIsLoggedIn(true));
      dispatch(setUser({ ...response.data.data }));
      return navigate('/');
    } catch (error) {
      console.error('Ошибка отправки данных формы:', error);
      setError(
        error?.response?.data?.message || 'Ошибка отправки данных формы'
      );
    }
  };

  return (
    <section className={styles.register}>
      <header className={styles.header}>
        <div className="container">
          <LangDropdown />
        </div>
      </header>
      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>SaleScout</h1>
          <form className={styles.form} action="#" onSubmit={handleSubmit}>
            <p className={styles.heading}>Регистрация</p>
            <label className={styles.label}>
              Имя
              <Input
                placeholder="Введите имя"
                name="name"
                required
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Номер телефона
              <Input
                placeholder="+7(___) __ ___"
                name="phone"
                required
                needMask={true}
                type="text"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Пароль
              <InputPassword
                placeholder="Введите пароль"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Повторите пароль
              <InputPassword
                placeholder="Повторите пароль"
                name="rePassword"
                type="password"
                required
                value={formData.rePassword}
                onChange={handleChange}
              />
            </label>
            {error && <div className={styles.error}>{error}</div>}
            <Button type="submit">Войти</Button>
            <p className={styles.noaccount}>
              <span>Есть аккаунт?</span>
              <Link to="/login">Войти</Link>
            </p>
          </form>
        </div>
      </main>
    </section>
  );
};

export default Register;
