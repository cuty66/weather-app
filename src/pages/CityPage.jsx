import { useState, useEffect } from "react"
import CityList from "../components/CityList";
import Search from "../components/Search";
import useWeather from "../hook/useWeather";
import useLocation from "../hook/useLocation";
import { MapPin } from "lucide-react";

export default function CityPage(){
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);
    const {location, getLocation} = useLocation();
    const [searchCity, setSearchCity] = useState(null);
    const {
        locationData, 
        citiesWeather,
        isLoading, 
        isError, 
        getWeatherByCity, 
        getCityByCoordinates, 
        getCitiesByProvince,
        getWeatherByCities, findCityByName} = useWeather();

    function handleSearch(e){
        e.preventDefault();
        const foundCity = findCityByName(city);
        if(!foundCity) return;
        getWeatherByCity(foundCity).then(result => {
            setSearchCity(result);
        });
    }

    function handleCity(e) {
        setCity(e.target.value);
    }

    useEffect(()=>{
        getLocation();
    }, []);

    useEffect(()=>{
        if(!location.latitude || !location.longitude) {
            return;
        }
        getCityByCoordinates(location.latitude, location.longitude);

    }, [location]);


    useEffect(() => {
        if(!locationData?.countryName || !locationData.principalSubdivision) {
            return
        }
        async function loadCities() {
            const data = await getCitiesByProvince(locationData?.principalSubdivision);
            setCities(data);
            await getWeatherByCities(data);
        }

        loadCities();
    }, [locationData])

    const combinedData = cities.map((city, index) => {
        return {
            ...city,
            weather: citiesWeather[index] || null
        };
    });

    return(
        <div className="city-page">
            <div className="container">
                <div className="current-city_content">
                    <h2 className="cities-page_title">
                        <MapPin />
                        {locationData?.countryName } - {locationData?.principalSubdivision}
                    </h2>
                    <Search onSearch={handleSearch} onCity={handleCity} myCity={city} />
                    {
                        isLoading && !isError &&
                        <p>is Loading</p>
                    }
                    {
                        isError &&
                        <p>Error is occured</p>
                    }

                    {!isLoading && searchCity ? 
                        ( 
                            <CityList cities={[searchCity]} /> 
                        ) : (
                            cities.length > 0 && <CityList cities={combinedData} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}