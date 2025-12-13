import React from 'react';


function Brokerage(){

    return (
        <div className='container'>
             <div className='row mt-5 p-5 border-top'>

                <div className='col-8 p-4' >
                   <a href='#' style={{textDecoration:"none"}}><h1 className='fs-5'>Brokerage calculaor</h1></a>
                    <ul className='text-muted' style={{lineHeight:"1.8"}}>
                        <li>This must be change after</li>
                        <li>This must be change after</li>
                        <li>This must be change after</li>
                        <li>This must be change after</li>
                        <li>This must be change after</li>
                    </ul>

                </div>
                <div className='col-4 p-4'>
                    <a href='#' style={{textDecoration:"none"}}><h1 className='fs-5'>List of charges</h1></a>
                </div>

             </div>
        </div>
    )
}

export default Brokerage;