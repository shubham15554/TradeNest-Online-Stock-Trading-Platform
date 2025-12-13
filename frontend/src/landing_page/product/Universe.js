
import React from 'react';

function Universe(){

    return (
        <div className='container ' style={{marginTop:"90px"}}>

            <div className='row  text-center'>
                <h1>The Zerodha Universe</h1>
                <p className='mt-3'>Extend your trading and investment experience even further with our partner platforms</p>
            </div>


            <div className='row p-5'>
              
              <div className='col-4'>
                <img src='media/images/smallcaseLogo.png'></img>
                <p className='text-small text-muted mt-3 text-center'>Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.</p>
              </div>

              <div className='col-4'>
                <img src='media/images/zerodhaFundhouse.png' style={{width:"55%"}}></img>
                <p className='text-small text-muted  mt-3 '>Our asset management venture that is creating simple and transparent index funds to help you save for your goals.</p>
              </div>

              <div className='col-4'>
                <img src='media\images\sensibullLogo.svg' style={{width:"80%"}}></img>
                <p className='text-small text-muted  mt-3 '>Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.</p>
              </div>
            </div>


             <div className='row p-5'>
              
              <div className='col-4'>
                <img src='media/images/goldenpiLogo.png ' style={{width:"62%"}}></img>
                <p className='text-small text-muted  mt-3  '>Our asset management venture that is creating simple and transparent index funds to help you save for your goals.</p>
              </div>

              <div className='col-4'>
                <img src='media/images/streakLogo.png' style={{width:"50%"}}></img>
                <p className='text-small text-muted  mt-3 '>that helps you invest in diversified baskets of stocks on ETFs.</p>
              </div>

              <div className='col-4'>
                <img src='media/images/dittoLogo.png' style={{width:"40%"}}></img>
                <p className='text-small text-muted  mt-3 '>Personalized advice on life and health insurance. No spam and no mis-selling.</p>
              </div>


              <button className='btn btn-primary p-2 fs-5 mt-5' style={{width:"20%", margin: '0 auto'}}>SignUp for free</button>

            </div>


            







        </div>
    )
}


export default Universe;