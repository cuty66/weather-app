import CityCard from "./CityCard";

export default function CityList({weatherData, cityData}) {
    return(
        <div className="city-list-wrapper">
            <CityCard weatherData={weatherData} cityData={cityData} />
        </div>
    )
}