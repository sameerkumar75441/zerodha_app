import React, { useContext, useEffect } from 'react';
import { AppContent } from '../../context/AppContext';
import Hero from './Hero';
import Awards from './Awards';
import Stats from './Stats';
import Pricing from './Pricing';
import Education from './Education';
import OpenAccount from '../OpenAccount';
import Navbar from '../Navbar';
import Footer from '../Footer';

function HomePage() {
  const { isLoggedin } = useContext(AppContent);

  useEffect(() => {
    if (isLoggedin) {
      window.location.href = 'http://localhost:5174/';
    }
  }, [isLoggedin]);

  return ( 
    <>
      <Navbar/>
      <Hero/>
      <Awards/>
      <Stats/>
      <Pricing/>
      <Education/>
      <OpenAccount/>
      <Footer/>
    </>
  );
}

export default HomePage;
