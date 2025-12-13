import React from 'react';

function Hero2(){


    return (
        <div className='container-fluid support '>
            <div className='hero p-3 '>
                <h1>Support Portal</h1>
                <button className='btn btn-primary '>My tickets</button>
            </div>
            <div className='p-3 row mt-5' >
                <input className='' style={{height:"50px"}}></input>
            </div>

            <div className='mt-5 row'>
                <div className='col-8'>
                    <div class="dropdown">
            <button class="btn btn-secondary btn-lg dropdown-toggle w-100 me-0" type="button" data-bs-toggle="dropdown" aria-expanded="false" >Large button</button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Item 1</a></li>
                <li><a class="dropdown-item" href="#">Item 2</a></li>
                ...
            </ul>
            </div>
                </div>
            </div>

        </div>
    )
}

export default Hero2;