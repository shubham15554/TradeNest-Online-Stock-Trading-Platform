import React from 'react';


function Hero(){

    return (
        <div className='container'>
            <div className='row mt-5 border-bottom text-center p-5'>
                <h1>Pricing</h1>
                <h3 className='text-muted fs-5 mt-3'>Free equity investments and flat 20 rupees intraday F&Q trades</h3>
            </div>


            <div className='row mt-5 p-5 text-center'>

                <div className='col-4 p-f mt-5'>
                    <img src='media/images/pricingEquity.svg'></img>
                    <h2 className='fs-3'>Free equity delivery</h2>
                    <p className='mt-3 text-muted'>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className='col-4 p-f mt-5'>
                    <img src='media\images\intradayTrades.svg'></img>
                    <h2  className='fs-3'>Intraday and F&O trades</h2>
                    <p className='mt-3 text-muted'>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                <div className='col-4 p-f mt-5'>
                    <img src='media/images/pricingEquity.svg'></img>
                    <h2  className='fs-3'>Free direct MF</h2>
                    <p className='mt-3 text-muted'>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>
            </div>
            


        </div>
    )
}

export default Hero;