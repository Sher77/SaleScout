import React from 'react';

import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.scss';
import PasswordRecovery from './pages/PasswordRecovery/PasswordRecovery';

const App = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Routes>
      {isUserLoggedIn ? (
        <>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/forget-password" element={<PasswordRecovery />} />
        </>
      )}
    </Routes>
  );
};

export default App;
