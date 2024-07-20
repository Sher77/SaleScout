import React from 'react';

import styles from './LangDropdown.module.scss';

const languages = [
  ['kk', 'Қазақша'],
  ['ru', 'Русский'],
];

const LangDropdown = () => {
  const dropdownRef = React.useRef(null);
  const [isDropOpen, setDropOpen] = React.useState(false);
  const [lang, setLang] = React.useState('ru');

  const pickLanguage = (item) => {
    setLang(item[0]);
    setDropOpen(false);
  };

  const handleToggleDropdown = () => {
    setDropOpen(!isDropOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <button onClick={handleToggleDropdown} className={styles.pickedLang}>
        {lang}
      </button>
      {isDropOpen && (
        <div className={styles.drop}>
          {languages.map((item) => (
            <button
              key={item[0]}
              onClick={() => pickLanguage(item)}
              className={styles.lang}
            >
              <span>{item[0]}</span> {item[1]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LangDropdown;
