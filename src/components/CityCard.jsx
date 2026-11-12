import { Link } from "react-router-dom"

export default function CityCard({city, temperature, time}) {
    return(
        <div className="city-card">
            <Link to={`/city/${city.slug}`} >
                <div className="city-card_left">
                    <h3 className="city-name">{city.title}</h3>
                    <span className="time">{
                    time ? 
                        new Date(time).toLocaleTimeString()
                        : ""
                    }
                    </span>
                </div>
                <h2 className="city-temp">{temperature}<span>°C</span></h2>
            </Link>
        </div>
    )
}