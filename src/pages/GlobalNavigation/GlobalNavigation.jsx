import React from 'react';

import { Outlet } from 'react-router-dom';

import Header from '../../share/header/Header';
import Footer from '../Footer/Footer';

const GlobalNavigation = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default GlobalNavigation;
