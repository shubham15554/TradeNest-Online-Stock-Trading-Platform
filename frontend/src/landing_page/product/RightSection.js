import React from 'react';


function RightSection({image , productName , prodDesc , learnMore}){

    return (
        <div className='container'>

           <div className='row'>
                <div className='col-6 mt-5 p-5'>
                    <h1>{productName}</h1>
                    <p className='mt-3'>{prodDesc}</p>
                    <div className=''>
                        <a href={learnMore} style={{ textDecoration: "none" }}>Learn more  <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
    
                </div>

                <div className='col-6 py-5'>
                    <img src={image} style={{width:"90%"}}></img>
                </div>
           </div>
        </div>
    )
}

export default RightSection;