import { useEffect, useMemo } from "react";
import CurrentWeather from "../components/CurrentWeather";
import TodaysForecast from "../components/TodaysForecast";
import useWeather from "../hook/useWeather";
import weatherCode from '../utils/weatherCodes'
import WeatherDetails from "../components/WeatherDetails";
import useLocation from "../hook/useLocation";

export default function HomePage(){
    const {location, getLocation} = useLocation();
    const {
        cityData,
        weatherData,
        isLoading,
        error,
        getWeatherByCoordinates,
        getCityByCoordinates
    } = useWeather();

    useEffect(()=>{
        getLocation();
    }, []);

    useEffect(()=>{
        if(!location.latitude || !location.longitude) {
            return;
        }
        getWeatherByCoordinates(location.latitude, location.longitude);
        getCityByCoordinates(location.latitude, location.longitude);

    }, [ location.latitude,location.longitude,getWeatherByCoordinates,getCityByCoordinates]);


    const today = weatherData?.current?.time?.slice(0, 10);
    const todayData = useMemo(() => {
        return weatherData?.hourly?.time.map((time, index) => ({
            time,
            temperature: weatherData?.hourly.temperature_2m[index],
            precipitation: weatherData?.hourly.precipitation_probability[index],
            code: weatherData?.hourly.weather_code[index],
        })).filter(item => item.time.startsWith(today)) ?? [];
    }, [weatherData])
   

    const wCode = weatherData?.current?.weather_code;
    const weatherDescription = weatherCode(wCode);

    const nextHourIndex = weatherData?.hourly?.time.findIndex(
        time => time > weatherData?.current?.time
    );
    return(
        <div className="home-page">
            <div className="container">
                {isLoading && !error && <p className="text-center">صفحه در حال بارگذاری است</p>}
                {error && <p className="text-center">{error}</p>}

                { !isLoading && weatherData && ( 
                    <CurrentWeather 
                        temp={weatherData?.current?.temperature_2m} 
                        unit={weatherData?.current_units?.temperature_2m}
                        city={cityData}
                        description={weatherDescription}
                        rainChance={weatherData?.hourly?.precipitation_probability[nextHourIndex]}
                        humidity={weatherData?.current?.relative_humidity_2m}
                        wind={weatherData?.current?.wind_speed_10m}
                        code={wCode}
                    />
                )}

                { !isLoading && todayData.length > 0 && <TodaysForecast todayCast={todayData}  />}

                { !isLoading && !isError && weatherData && (<WeatherDetails 
                    feelsLike={weatherData?.current?.apparent_temperature} 
                    visibility={weatherData?.current?.visibility} 
                    pressure={weatherData?.current?.surface_pressure} 
                    sunrise={new Date(weatherData?.daily?.sunrise[0]).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })} 
                />)}
            </div>
        </div>
    )
}