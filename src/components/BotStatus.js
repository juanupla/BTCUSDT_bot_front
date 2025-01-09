import React from 'react';
import './BotStatus.css'

const BotStatus = ({apiData}) => {
    if(apiData){
        return(
            <div className='container-fluid'>
                <div className='row img-contain'>
                    <img 
                        className='img12' 
                        src='/botStatusOn.png' 
                        alt='Bot Status'
                        onError={(e) => {
                            console.error('Error loading image:', e);
                        }}
                    />
                </div>
            </div>
        )
    }
    else{
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12'>
                        <div>chau</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BotStatus;