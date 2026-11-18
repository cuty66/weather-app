import { Clock, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export default function CityCard({city}) {
    return(
        <div className="city-card">
            <Link to={`/city/${city.slug}`} >
                <div className="city-card_left">
                    <h3 className="city-name">
                        <MapPin />
                        {city.title}
                    </h3>
                    <span className="time">
                        <Clock size={16} />
                        {
                            city?.weather?.current?.time ? new Date(city?.weather?.current?.time).toLocaleTimeString() : ""
                        }
                    </span>
                </div>
                <h2 className="city-temp">{city?.weather?.current?.temperature_2m}<span>°C</span></h2>
            </Link>
        </div>
    )
}