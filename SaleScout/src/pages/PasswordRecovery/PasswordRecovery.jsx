import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import { FaAngleLeft } from 'react-icons/fa6';
import { ImNotification } from 'react-icons/im';

import passwordRecoveryImg from '../../assets/img/passwordRecovery.png';
import logoPng from '../../assets/img/logo.png';

import styles from './PasswordRecovery.module.scss';

const PasswordRecovery = () => {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <Link className={styles.goBackLink} to="/login">
          <FaAngleLeft />
          Вернуться на страницу входа
        </Link>
        <form action="#" className={styles.form}>
          <img
            className={styles.logoPng}
            src={logoPng}
            alt="Логотип SaleScout"
          />
          <h2 className={styles.title}>Восстановление пароля</h2>
          <p className={styles.description}>
            Введите номер телефона, который вы указывали при регистрации
          </p>
          <label className={styles.label}>
            Номер телефона
            <Input
              placeholder="+7(___) __ ___"
              name="phone"
              required
              type="text"
              needMask={true}
            />
          </label>
          <div className={styles.tooltip}>
            <ImNotification />
            Код будет отправлен на WhatsApp
          </div>
          <Button>Подтвердить и отправить код</Button>
        </form>
      </div>
      <div className={styles.right}>
        <img
          className={styles.passwordRecoveryImg}
          src={passwordRecoveryImg}
          alt="Картинка человека, забывашего пароль"
        />
        <p className={styles.heading}>
          Не бейте себя головой об клавиатуру, если забыли пароль!
        </p>
        <p className={styles.desc}>
          Воспользуйтесь функцией восстановления доступа и следуйте инструкциям,
          чтобы безопасно сбросить ваш пароль.
        </p>
      </div>
    </div>
  );
};

export default PasswordRecovery;
