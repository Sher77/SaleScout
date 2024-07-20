import React from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import styles from './InputPassword.module.scss';

const InputPassword = ({ ...props }) => {
  const [passwordVisible, setPasswordVisible] = React.useState(true);

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <p className={styles.inputWrap}>
      <input
        className={styles.input}
        {...props}
        type={passwordVisible ? 'password' : 'text'}
      />
      <button
        type="button"
        className={styles.passwordIconBtn}
        onClick={showPassword}
      >
        <IconContext.Provider value={{ color: '#6C7E8F', size: '15px' }}>
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </IconContext.Provider>
      </button>
    </p>
  );
};

export default InputPassword;
