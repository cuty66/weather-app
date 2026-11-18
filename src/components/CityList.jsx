import CityCard from "./CityCard";

export default function CityList({cities}) {
    return(
        <div className="city-list-wrapper">
            {cities.length > 0 && (
                cities.map((city) => 
                <CityCard 
                    key={city.id} 
                    city={city}
                />)
            )}
        </div>
    )
}