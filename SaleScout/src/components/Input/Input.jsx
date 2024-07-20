import React from 'react';

import { useMask } from '@react-input/mask';

import styles from './Input.module.scss';

const Input = ({ needMask = false, ...props }) => {
  const inputRef = useMask({
    mask: '+7 (___) ___-__-__',
    replacement: { _: /\d/ },
  });

  return (
    <p className={styles.inputWrap}>
      <input
        ref={needMask ? inputRef : null}
        className={styles.input}
        {...props}
      />
    </p>
  );
};

export default Input;
