import { useState, useEffect } from "react"
import axios from "axios"




const WheaterData = ({country}) => {
  const OPENWEATHER_API_KEY = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${OPENWEATHER_API_KEY}`)
    .then((response) => {
      setWeather(response.data);
    })
  }, [])


  return(
    <div>
      {weather.main ? (
        <div>
          <h2>Wheater in {country.capital[0]}</h2>
          <p><b>temperature:</b> {weather.main.temp} Celsius</p>
          <img
            alt="weather icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p><b>wind:</b> {weather.wind.speed} m/s</p>
        </div>
      ) : null }
    </div>
  )
}
export default WheaterData;
