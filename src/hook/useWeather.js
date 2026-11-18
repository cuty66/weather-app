import { useState, useCallback, useRef } from "react";
import provinces from "../data/province.json";
import cities from "../data/cities.json";

export default function useWeather(){
    const [weatherData, setWeatherData] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [locationData, setLocationData] = useState(null);
    const controllerRef = useRef(null);



    const getWeatherByCity = useCallback(async (city)=>{
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;

        try {
            setIsLoading(true);
            setError(null);
            const latitude = city.latitude;
            const longitude = city.longitude;

            const weatherResponse  = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,precipitation_probability`,
                {signal: controller.signal}
            );
            if(!weatherResponse.ok) {
                throw new Error(`Response status: ${weatherResponse.status}`);
            }
            const data2 = await weatherResponse.json();
            return {
                ...city,
                weather: data2
            };

        } catch(error) {
            if(error.name === "AbortError") {
                return 
            }

            setError(error.message);
        } finally {
            if (controllerRef.current === controller) {
                setIsLoading(false);
            }
        }
    }, []);

    const getWeatherByCities = useCallback(async (cities) => {
        try {
            setIsLoading(true);
            setError(null);
            const latitudes = cities.map(c => c.latitude);
            const longitudes = cities.map(c => c.longitude);

            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitudes}&longitude=${longitudes}&current=temperature_2m,weather_code&hourly=temperature_2m,precipitation_probability,relative_humidity_2m,wind_speed_10m`
            );

            if (!weatherResponse.ok) {
                throw new Error(`Response status: ${weatherResponse.status}`);
            }

            const data = await weatherResponse.json();

            const combinedData = cities.map((city, index) => ({
                ...city,
                weather: data[index]
            }));

            return combinedData;

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getWeatherByCoordinates = useCallback(async (latitude, longitude)=>{
        setIsLoading(true);
        setError(null);
        try {
            const weatherResponse  = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,apparent_temperature,visibility,surface_pressure,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=sunrise&timezone=auto`);

            if(!weatherResponse.ok) {
                throw new Error(`Response status: ${weatherResponse.status}`);
            }
            const data2 = await weatherResponse.json();
            setWeatherData(data2);
        } catch(error) {
            setError(error.message);
        } finally {
            setIsLoading(false)
        }
    },[])

    const getCityByCoordinates = useCallback(async (latitude, longitude)=>{
         try {
            const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();

            setCityData(data.city);
            setLocationData(data);

        } catch(error) {
            console.error(error.message);
        }
    }, []);

    const getCitiesByProvince = useCallback((stateName) => {
        try {
            const province = provinces.find(province => province.slug === stateName);
            if (!province) {
                throw new Error("استان یافت نشد");
            }
            return cities.filter(
                city => city.province_id === province.id
            );

        } catch(error) {
            console.error(error.message);
        } 
    }, []);

   

    return {
        cityData,
        locationData,
        weatherData,
        isLoading,
        error,
        getWeatherByCity,
        getWeatherByCoordinates,
        getCityByCoordinates,
        getCitiesByProvince,
        getWeatherByCities,
    }
}
    
    
