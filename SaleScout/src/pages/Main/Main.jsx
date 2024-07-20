import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setUser,
  setIsLoggedIn,
  clearState,
} from '../../redux/slices/UserSlice';

import styles from './Main.module.scss';

import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import LangDropdown from '../../components/LangDropdown/LangDropdown';

import { FaPlus } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [user]);

  const logOut = () => {
    dispatch(clearState());
    navigate('/login');
  };

  return (
    <section className={styles.mainPage}>
      <header className={styles.header}>
        <div className={`${styles.con} container`}>
          <Link className={styles.logo} to="/">
            SaleScout
          </Link>
          <div className={styles.right}>
            <p className={styles.phone}>{user.phone}</p>
            <LangDropdown />
            <button className={styles.logout} onClick={logOut}>
              Выйти
            </button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className="container">
          {isLoading ? (
            <div className={styles.loader}>
              <Oval
                visible={true}
                height="80"
                width="100"
                color="#1890ff"
                secondaryColor="#46a3fa"
                strokeWidth="4"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <>
              <h1 className={styles.name}>Привет, {user.name}!</h1>
              <p className={styles.description}>Добавь свой первый магазин</p>
              <button className={styles.addStoreBtn}>
                <IconContext.Provider
                  value={{ color: '#1890ff', size: '20px' }}
                >
                  <FaPlus />
                </IconContext.Provider>
              </button>
            </>
          )}
        </div>
      </main>
    </section>
  );
};

export default Main;
