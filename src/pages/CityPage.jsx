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
        if (!e.target.value.trim()) {
            setSearchCity(null);
        }
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
            const data = await getCitiesByProvince(
                locationData?.principalSubdivision
            );
            const citiesWithWeather = await getWeatherByCities(data);
            setCities(citiesWithWeather);
        }
        loadCities();
    }, [locationData])

    return(
        <div className="city-page">
            <div className="container">
                <div className="current-city_content">
                    {
                        (locationData?.countryName || locationData?.principalSubdivision) && (
                            <h2 className="cities-page_title">
                                <MapPin />
                                {locationData?.countryName } - {locationData?.principalSubdivision}
                            </h2>
                        )
                    }
                    
                    <Search onSearch={handleSearch} onCity={handleCity} myCity={city} />

                    {isLoading && !isError && <p className="text-center">صفحه در حال بارگذاری است</p> }
                    {isError && <p className="text-center">{isError.message}</p> }

                    {!isLoading && (
                        searchCity ? (
                            <CityList cities={[searchCity]} />
                        ) : (
                            cities.length > 0 && <CityList cities={cities} />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}