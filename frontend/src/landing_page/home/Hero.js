import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


function Hero() {

  navigate = useNavigate();

  function handleSignup(){
    navigate("/signup");
  }
    return ( 

        <div className='container p-5 mb-5'>
          <div className='row text-center'>
              <img src='media/images/homeHero.png' className='mb-5' alt='Hero image'></img>
              <h1 className='mt-5'>Invest in everything</h1>
              <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
              <button className='btn btn-primary p-2 fs-5' style={{width:"20%", margin: '0 auto'}} onClick={handleSignup}>SignUp for free</button>
          </div>
        </div>
     );
}

export default Hero;