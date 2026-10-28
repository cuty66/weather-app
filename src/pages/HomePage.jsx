import { useEffect, useState } from "react";
import CurrentWeather from "../components/CurrentWeather";
import TodaysForecast from "../components/TodaysForecast";
import useWeather from "../hook/useWeather";
import weatherCode from '../utils/weatherCodes'

export default function HomePage(){
    const [location, setLocation] = useState({});
    const {
        cityData,
        weatherData,
        isLoading,
        isError,
        getWeatherByCoordinates,
        getCityByCoordinates
    } = useWeather();

    // console.log(weatherData);
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                setLocation({
                    latitude,
                    longitude
                });
            },
            (error) => {
                console.log(error)
            }
        )
    }, []);

    useEffect(()=>{
        if(!location.latitude || !location.longitude) {
            return;
        }
        getWeatherByCoordinates(location.latitude, location.longitude);
        getCityByCoordinates(location.latitude, location.longitude);

    }, [location]);

    const today = new Date().toISOString().slice(0, 10);
    const todayData = weatherData?.hourly?.time.map((time, index) => ({
        time,
        temperature: weatherData?.hourly.temperature_2m[index],
        precipitation: weatherData?.hourly.precipitation_probability[index],
    })).filter(item => item.time.startsWith(today)) ?? [];

    const weatherDescription = weatherCode(weatherData?.current?.weather_code)

    // const currentIndex = weatherData?.hourly?.time.indexOf(
    //     weatherData?.current?.time
    // );

    const nextHourIndex = weatherData?.hourly?.time.findIndex(
        time => time > weatherData?.current?.time
    );
    
    return(
        <div className="home-page">
            <CurrentWeather 
            temp={weatherData?.current?.temperature_2m} 
            unit={weatherData?.current_units?.temperature_2m}
            city={cityData}
            description={weatherDescription}
            rainChance={weatherData.hourly.precipitation_probability[nextHourIndex]}
            />

            {
                todayData.length > 0 && <TodaysForecast todayCast={todayData}  />
            }
        </div>
    )
}