import React from 'react';
import './BotStatus.css'

const BotStatus = ({apiData}) => {
    if(apiData){
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <img 
                        className='img12 col-12' 
                        src='./botStatusOn.png' 
                        alt='Bot Status'
                        onError={(e) => {
                            console.error('Error loading image:', e);
                        }}
                    />
                </div>
            </div>
        )
    }else{
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <img 
                        className='img12 col-12' 
                        src='./botStatusOff.jpg' 
                        alt='Bot Status'
                        onError={(e) => {
                            console.error('Error loading image:', e);
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default BotStatus;