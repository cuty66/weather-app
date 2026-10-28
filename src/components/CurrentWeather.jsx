export default function CurrentWeather({temp, unit, city, description, rainChance}){
    return(
        <div>
            <h3 className="city-name">{city}</h3>
            <span className="subtitle">{description } - Chance of rain {rainChance} %</span>
            <div>
                <div className="weather-icon"></div>
                <h4 className="weather-temp">{temp}<sup>{unit}</sup></h4>
            </div>
        </div>
    )
}