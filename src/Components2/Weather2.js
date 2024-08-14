import React, { useState } from "react";
import './Weather2.css';
import { FaSearch , FaWind } from "react-icons/fa";
import {MdLocationOn} from 'react-icons/md';
import {WiHumidity} from 'react-icons/wi';

const Weather2 = () => {
const [city , setCity] = useState('');
const [weather1, setWeather1] = useState();
const [error , setError] = useState();
   
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5acc1683650652bab831ecf7d57fd397`;
    
function handleOnchange(event) {
    setCity(event.target.value);
  
}

async function fetchData(params) {
    try{
let response = await fetch(url);
let output = await response.json();
if(response.ok) {
    setWeather1(output);
    console.log(output);
    setError('');
 } else{
       setError('No data found .Please enter a valid city' ) 
    }

}

    catch(error){


    }
    
}

    return (
        <div className="container">
            <div className="city">
          <input type="text" value={city} onChange={handleOnchange} placeholder="Enter any city name"></input> 
          <button onClick={() => fetchData()}>
          <FaSearch/>
          </button>     
            </div>

            {
                error && <p className="error-message">{error}</p>
            }

            
{
weather1 && weather1.weather &&
            <div className='content'>

                <div className='weather-image'>
                    <img src={`https://openweathermap.org/img/wn/${weather1.weather[0].icon}@2x.png`} alt=''></img>
                    <h3 className='desc'>{weather1.weather[0].description}</h3>
                </div>


                <div className='weather-temp'>
                    <h2>{weather1.main.temp}<span>&deg;C</span></h2>
                </div>


                <div className='weather-city'>
                    <div className='location'>
                        <MdLocationOn></MdLocationOn>
                    </div>
                    <p>{weather1.name},<span>{weather1.sys.country}</span></p>
                </div>


                <div className='weather-stats'>
                    <div className='wind'>
                        <div className='wind-icon'>
                            <FaWind></FaWind>
                        </div>
                        <h3 className='wind-speed'>{weather1.wind.speed}<span>Km/h</span></h3>
                        <h3 className='wind-heading'>Wind Speed</h3>
                    </div>  


                    <div className='humidity'>
                        <div className='humidity-icon'>
                            <WiHumidity></WiHumidity>
                        </div>
                        <h3 className='humidity-percent'>{weather1.main.humidity}<span>%</span></h3>
                        <h3 className='humidity-heading'>Humidity</h3>
                    </div>


                </div>
            </div>
        }  

        </div>
    )
}

export default Weather2;