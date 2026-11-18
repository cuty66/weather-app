import { useParams } from "react-router-dom";
import TodaysForecast from "../components/TodaysForecast";
import { useEffect, useState } from "react";
import useWeather from "../hook/useWeather";
import weatherCode from '../utils/weatherCodes';
import CurrentWeather from "../components/CurrentWeather";

export default function CityDetails(){
    const {city} = useParams();
    const [cityInfo, setCityInfo]= useState();
    const {isLoading, isError, getWeatherByCity, findCityByName} = useWeather();
    useEffect(()=>{
        if(!city) return;
        const foundCity = findCityByName(city);
        if(!foundCity) return;
        async function loadCityInfo() {
            const result = await getWeatherByCity(foundCity);
            setCityInfo(result);
        }
        loadCityInfo();
    },[city]);
    const wCode = cityInfo?.weather?.current?.weather_code;
    const weatherDescription = weatherCode(cityInfo?.weather?.current?.weather_code);
    const today = new Date().toISOString().slice(0, 10);
    const todayData = cityInfo?.weather?.hourly?.time.map((time, index) => ({
        time,
        temperature: cityInfo?.weather?.hourly?.temperature_2m[index],
        precipitation: cityInfo?.weather?.hourly?.precipitation_probability[index]
    })).filter(item => item?.time.startsWith(today)) ?? [];

    const nextHourIndex = cityInfo?.weather?.hourly?.time.findIndex(
        time => time > cityInfo?.weather?.current?.time
    );

    return(
        <div className="city-detail-page">
            <div className="container">
                {isLoading && !isError && <p className="text-center">صفحه در حال بارگذاری است</p>}
                {isError && <p className="text-center">Page Occurred Error</p>}
                { !isLoading && cityInfo && (
                    <>
                        {cityInfo?.weather && (
                            <CurrentWeather 
                                temp={cityInfo?.weather?.current?.temperature_2m} 
                                unit={cityInfo?.weather?.current_units?.temperature_2m}
                                city={cityInfo?.title}
                                description={weatherDescription}
                                rainChance={cityInfo?.weather?.hourly?.precipitation_probability[nextHourIndex]}
                                humidity={cityInfo?.weather?.current?.relative_humidity_2m}
                                wind={cityInfo?.weather?.current?.wind_speed_10m}
                                code={wCode}
                            />
                        )}
                    

                        <div>
                            {todayData.length> 0 && (<TodaysForecast todayCast={todayData} />)}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}