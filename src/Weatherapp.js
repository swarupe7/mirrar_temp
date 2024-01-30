
import React, { useState } from 'react';
import axios from 'axios';
import Info from './info'; 
import Forecast from './forecast';


const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(null);
  const [celsius,setCelsius] =useState(true);
  const [forecast, setForecast] = useState([]);

  const getWeatherInfo = () => {
    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = 'bea64792551047ca67bb92297d8c3846';

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(res=> {const data=res.data;

      const selectedForecast = [];

      const uniqueDates = new Set();

      // Loop through the forecast data in groups of 5
      for (let i = 0; i < data.list.length; i += 5) {
        // Calculate the average temperature for the group of 5
        const averageTemperature = calculateAverageTemperature(data.list.slice(i, i + 5));
  
        // Select the first item from each group of 5 and use the average temperature
        const selectedItem = data.list[i];
        selectedItem.main.temp = averageTemperature;
        selectedItem.dt_txt=selectedItem.dt_txt.slice(0,10);
       
        if (!uniqueDates.has(selectedItem.dt_txt)) {
          // Add the date to the set to avoid duplicates
          uniqueDates.add(selectedItem.dt_txt);
        // Push the selected item into the array
        selectedForecast.push({
          datetime:selectedItem.dt_txt ,
          temperature: averageTemperature.toFixed(2),
          weatherCondition: selectedItem.weather[0].main,
          description: selectedItem.weather[0].description,
          icon: selectedItem.weather[0].icon,
        });
      }
    }
  
      // Set the state with the selected forecast items
      setForecast(selectedForecast);
    }).catch(error => console.log(error));


    const calculateAverageTemperature = (group) => {
      const totalTemperature = group.reduce((acc, item) => acc + item.main.temp, 0);
      return totalTemperature / group.length;
    };

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => {
        const data = response.data;
        
        const temperatureCelsius = Math.round(data.main.temp.toFixed(2) - 273);
        let temperatureFahrenheit = temperatureCelsius * 1.8 + 32;
        const minCelsius=Math.round(data.main.temp_min - 273);
        let minFahrenheit=minCelsius * 1.8 + 32;
        const maxCelsius=Math.round(data.main.temp_max - 273);
        let maxFahrenheit=maxCelsius * 1.8 + 32;
        temperatureFahrenheit=temperatureFahrenheit.toFixed(2);
        minFahrenheit=minFahrenheit.toFixed(2);
        maxFahrenheit=maxFahrenheit.toFixed(2);

        setWeatherInfo({
          temperatureCelsius,
          temperatureFahrenheit,
          minCelsius,
          minFahrenheit,
          maxCelsius,
          maxFahrenheit,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
          weatherCondition: data.weather[0].main,
          description: data.weather[0].description,
          icon:data.weather[0].icon,
        });

        setError(null);
      })
      .catch(error => {
        
        setWeatherInfo(null);
        setError("Please enter a valid city.");
      });
  };

  return (
    <div style={{ backgroundImage: `url('./bg.jpg')`, backgroundSize: 'cover',height:'100vh', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed',overflowY:'auto' }}>
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-light" style={{margin:"0 auto"}}>Weather App</span>
        </div>
      </nav>

      <div className="container mt-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
        <div className="row justify-content-center">
          <form className="col-lg-6 col-md-8 col-sm-10">
            <div className="form-container">
             
             <b> <p>Search for weather in any city</p></b>  
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={getWeatherInfo}
                  >
                     Info
                  </button>
                </div>
              </div>
            </div>
          </form>
          
          
        </div>
        <Info weatherInfo={weatherInfo} error={error} celsius={celsius} setCelsius={setCelsius}/>

         {!error && <Forecast forecast={forecast} celsius={celsius}  />  } 

       
      </div>
    </div>
  );
};

export default WeatherApp;
