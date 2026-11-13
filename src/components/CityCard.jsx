import { Clock, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export default function CityCard({city, temperature, time}) {
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
                            time ? new Date(time).toLocaleTimeString() : ""
                        }
                    </span>
                </div>
                <h2 className="city-temp">{temperature}<span>°C</span></h2>
            </Link>
        </div>
    )
}