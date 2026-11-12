import CityCard from "./CityCard";

export default function CityList({cities}) {
    // console.log(cities.length)
    return(
        <div className="city-list-wrapper">
            {cities.length > 0 && (
                cities.map((city) => 
                <CityCard 
                    key={city.id} 
                    city={city}
                    temperature={city?.weather?.current?.temperature_2m}
                    time={city?.weather?.current?.time}
                />)
            )}
        </div>
    )
}