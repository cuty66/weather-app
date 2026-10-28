import { useState } from "react";
export default function useWeather(){
    const [weatherData, setWeatherData] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    async function getWeatherByCity(city){
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

            // const weatherResponse  = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m`);
            const weatherResponse  = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&hourly=temperature_2m,precipitation_probability`);
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


    async function getWeatherByCoordinates(latitude, longitude) {
        setIsLoading(true);
        setIsError(false);
        try {
            // const weatherResponse  = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m,precipitation_probability`);
            const weatherResponse  = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&hourly=temperature_2m,precipitation_probability`);
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

    async function getCityByCoordinates(latitude, longitude) {
        try {
            const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();

            // console.log("city data:", data);
            setCityData(data.city);

        } catch(error) {
            console.error(error.message);
        }
    }
    return {
        cityData,
        weatherData,
        isLoading,
        isError,
        getWeatherByCity,
        getWeatherByCoordinates,
        getCityByCoordinates
    }
}
    
    
