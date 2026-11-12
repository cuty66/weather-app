import { useParams } from "react-router-dom";
import TodaysForecast from "../components/TodaysForecast";
import { useEffect } from "react";
import useWeather from "../hook/useWeather";
import weatherCode from '../utils/weatherCodes'

export default function CityDetails(){
    const {city} = useParams();
    const {cityData, weatherData, isLoading, isError, getWeatherByCity} = useWeather();
    useEffect(()=>{
        if(!city) return;
        getWeatherByCity(city);
    },[city]);

    const weatherDescription = weatherCode(weatherData?.current?.weather_code);
    const today = new Date().toISOString().slice(0, 10);
    const todayData = weatherData?.hourly?.time.map((time, index) => ({
        time,
        temperature: weatherData?.hourly?.temperature_2m[index],
        precipitation: weatherData?.hourly?.precipitation_probability[index]
    })).filter(item => item?.time.startsWith(today)) ?? [];
    return(
        <div className="city-detail-page">
            <div className="container">
                <h1>{cityData?.name || city}</h1>
                {isError && <p>Page Occurred Error</p>}
                {isLoading && !isError && <p>Page Data is Loading</p>}
                { !isLoading && weatherData && (<div>
                    <p>
                        Temp: {weatherData?.current?.temperature_2m} <span>°C</span>
                    </p>
                    <p>Time: {new Date(weatherData?.current?.time).toLocaleTimeString()}</p>
                    <p>{weatherDescription}</p>
                        
                    <h3>
                        Today Forcast of {city}
                    </h3>
                    {todayData.length> 0 && (<TodaysForecast todayCast={todayData} />)}
                </div>
                )}
            </div>
        </div>
    )
}