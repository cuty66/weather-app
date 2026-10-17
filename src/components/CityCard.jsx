import { Link } from "react-router-dom"

export default function CityCard({weatherData, cityData}) {
    console.log('city Card', cityData)
    return(
        <div className="city-card">
            <Link to={cityData.name} >
                <div className="city-card_left">
                    <h3 className="city-name">{cityData.name}</h3>
                    <span className="time">{
                    weatherData?.current?.time ? 
                        new Date(weatherData?.current?.time).toLocaleTimeString()
                        : ""
                    }
                    </span>
                </div>
                <h2 className="city-temp">{weatherData?.current?.temperature_2m}</h2>
            </Link>
        </div>
    )
}