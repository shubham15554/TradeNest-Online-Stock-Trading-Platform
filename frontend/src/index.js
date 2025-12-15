import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import HomePage from './landing_page/home/HomePage';
import Signup from './landing_page/signup/Signup';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import AboutPage from './landing_page/about/AboutPage';
import ProductPage from './landing_page/product/ProductPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';
import Login from './landing_page/login/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const App = () => {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/pricing' element={<PricingPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/support' element={<SupportPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
