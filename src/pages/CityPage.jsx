import { useState } from "react"
import CityList from "../components/CityList";
import Search from "../components/Search";
import TodaysForecast from "../components/TodaysForecast";

export default function CityPage(){
    const [city, setCity] = useState("");
    const [cityData, setCityData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const today = new Date().toISOString().slice(0, 10);
        
    async function apiFetch(){
        try {
            setIsLoading(true);
            setIsError(false);
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();

            if(!data.results || data.results.length === 0 ) {
                throw new Error("City not found");
            }

            setCityData(data.results[0]);

            const latitude = data.results[0].latitude;
            const longitude = data.results[0].longitude;

            const weatherResponse  = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
            if(!weatherResponse.ok) {
                throw new Error(`Response status: ${weatherResponse.status}`);
            }
            const data2   = await weatherResponse.json();
            console.log('hourly d', data2);
            setWeatherData(data2);

        } catch(error) {
            setIsError(true);
            console.error(error.message);
        } finally {
            setIsLoading(false)
        }
        
    }
    function handleSearch(e){
        e.preventDefault();
        console.log(city)
        apiFetch();
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
                todayData && <TodaysForecast todayCast={todayData}  />
            }
        </div>
    )
}