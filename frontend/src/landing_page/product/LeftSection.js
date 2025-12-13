
import React from 'react';



function LeftSection({image , productName , prodDesc , tryDemo , learnMore , gogolePlay , appStore}){

    return (
        <div className='container'>

           <div className='row'>
                <div className='col-6 py-5'>
                    <img src={image} style={{width:"90%"}}></img>
                </div>

                <div className='col-6 mt-5 p-5'>
                    <h1>{productName}</h1>
                    <p className='mt-3'>{prodDesc}</p>
                    <div className=''>
                        <a href={tryDemo} className='me-5' style={{ textDecoration: "none" }}>Try demo  <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                        <a href={learnMore} style={{ textDecoration: "none" }}>Learn more  <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>

                    <div className='mt-3'>
                        <a href={gogolePlay}><img src="media/images/googlePlayBadge.svg"></img></a>
                        <a href={appStore} className='ms-5'><img src="media/images/appStoreBadge.svg"></img></a>
                    </div>
    
                </div>
           </div>
        </div>
    )


}

export default LeftSection;