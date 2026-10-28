import { useState } from "react"
import CityList from "../components/CityList";
import Search from "../components/Search";
import TodaysForecast from "../components/TodaysForecast";
import useWeather from "../hook/useWeather";

export default function CityPage(){
    const [city, setCity] = useState("");

    const today = new Date().toISOString().slice(0, 10);
    const {cityData, weatherData, isLoading, isError, getWeatherByCity} = useWeather();
    
    function handleSearch(e){
        e.preventDefault();
        getWeatherByCity(city);
    }
    function handleCity(e) {
        setCity(e.target.value);
    }

    const todayData = weatherData?.hourly?.time.map((time, index) => ({
        time,
        temperature: weatherData?.hourly.temperature_2m[index]
    })).filter(item => item.time.startsWith(today)) ?? [];
        
    return(
        <div className="city-page">
            <h1 className="page-title">My Cities</h1>
            <Search onSearch={handleSearch} onCity={handleCity} myCity={city} />
            {
                isLoading && !isError &&
                <p>is Loading</p>
            }
            {
                isError &&
                <p>Error is occured</p>
            }
            { !isLoading && weatherData && <CityList weatherData={weatherData} cityData={cityData} /> }

            {
                todayData.length > 0 && <TodaysForecast todayCast={todayData}  />
            }
        </div>
    )
}