import React from 'react'

const Info = ({weatherInfo,error,celsius,setCelsius}) => {
  return (
    <div className="row justify-content-center">
        
    <div className="col-lg-6 col-md-8 col-sm-10">
      
      {error && <p className="text-danger">{error}</p>}
      {weatherInfo && (
        
        <div style={{margin:"0 auto"}}>

         <div style={{display:"flex" , justifyContent:"space-between"}}>
          
         {celsius ?
          
          (<>
          <p>Temperature : {weatherInfo.temperatureCelsius}&deg; C</p>
          <br />
          <p>Min: {weatherInfo.minCelsius}&deg; C      Max:{weatherInfo.maxCelsius}&deg; C</p>
          </>
          )
          :
          (<>
          <p>Temperature : {weatherInfo.temperatureFahrenheit}&deg; F</p>
          <br />
          <p>Min: {weatherInfo.minFahrenheit}&deg; F      Max:{weatherInfo.maxFahrenheit}&deg; F</p>
          </>
          )
         }
         <button className="btn btn-primary"
              type="button"
              onClick={()=>setCelsius(!celsius)}>
                swap

         </button>

         </div>
          <p>Wind Speed: {weatherInfo.windSpeed} m/s</p>
          <p>Humidity: {weatherInfo.humidity} gm-3</p>
          <p>Weather: {weatherInfo.weatherCondition} <img src= {`http://openweathermap.org/img/w/${weatherInfo.icon}.png`} alt="img" /> </p>
          <p>Description:  {weatherInfo.description} </p>
          

        </div>
      )}
    </div>
  </div>
  )
}

export default Info