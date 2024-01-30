import React from 'react';
import './forstyles.css';



const Forecast = ({forecast,celsius}) => {
  return (
    <div className="row justify-content-center">
    {console.log(forecast)}
    {forecast.length > 0 && (
      <div className="forecast-container">
        {forecast.slice(0,5).map((item, index) => (
          <div key={index} className="forecast-item">

             <img src= {`http://openweathermap.org/img/w/${item.icon}.png`} alt="img" />
            <p><b>Date: </b>{item.datetime}</p>
            
            <p><b>Temp:</b> {celsius ? convertKelvinToCelsius(item.temperature) : convertKelvinToFahrenheit(item.temperature) }</p>
            <p><b>Desc:</b> {item.description}</p>
           
          </div>
        ))}
      </div>
    )}
  </div>
  )
}


const convertKelvinToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(2)+"C";
}

// Function to convert Kelvin to Fahrenheit
const convertKelvinToFahrenheit = (kelvin) => {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(2)+"F";
}

export default Forecast;