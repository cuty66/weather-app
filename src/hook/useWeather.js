import { useState } from "react";
import provinces from "../data/province.json";
import cities from "../data/cities.json";
import {normalizeText} from "../utils/normalizeText";

export default function useWeather(){
    const [weatherData, setWeatherData] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [locationData, setLocationData] = useState(null);
    const [citiesWeather, setCitiesWeather] = useState([]);

    function findCityByName(cityName) {
        const searchValue = normalizeText(cityName);

        return cities.find(city =>
            normalizeText(city.title) === searchValue ||
            city.slug.toLowerCase() === searchValue.toLowerCase()
        );
    }
    async function getWeatherByCity(city){
        try {
            setIsLoading(true);
            setIsError(false);
            const latitude = city.latitude;
            const longitude = city.longitude;

            const weatherResponse  = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,precipitation_probability`);
            if(!weatherResponse.ok) {
                throw new Error(`Response status: ${weatherResponse.status}`);
            }
            const data2 = await weatherResponse.json();
            return {
                ...city,
                weather: data2
            };

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
            const weatherResponse  = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,apparent_temperature,visibility,surface_pressure,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=sunrise&timezone=auto`);

            if(!weatherResponse.ok) {
                throw new Error(`Response status: ${weatherResponse.status}`);
            }
            const data2 = await weatherResponse.json();
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

            setCityData(data.city);
            setLocationData(data);

        } catch(error) {
            console.error(error.message);
        }
    }

    async function getCitiesByProvince(stateName) {
        try {
            const province = provinces.find(province => province.slug === stateName);
            const citiesFiltered = cities.filter(
                city => city.province_id === province.id
            );
            return citiesFiltered;

        } catch (error) {
            console.error(error.message);
       }
    }

    async function getWeatherByCities(cities){
        try {
            const latitudes = cities.map(c => c.latitude);
            const longitudes = cities.map(c => c.longitude);
            const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitudes}&longitude=${longitudes}&current=temperature_2m,weather_code&hourly=temperature_2m,precipitation_probability,relative_humidity_2m,wind_speed_10m`);
            if(!weatherResponse.ok) {
                throw new Error(`Response status: ${weatherResponse.status}`);
            }
            const data = await weatherResponse.json();
            setCitiesWeather(data);
            
        } catch(error) {
            console.error(error.message);
        } 
    }

    return {
        cityData,
        locationData,
        weatherData,
        citiesWeather,
        isLoading,
        isError,
        getWeatherByCity,
        getWeatherByCoordinates,
        getCityByCoordinates,
        getCitiesByProvince,
        getWeatherByCities,
        findCityByName
    }
}
    
    
