import { Droplet, MapPin, Wind } from "lucide-react";
import WeatherIcons from "../utils/weatherIcons";

export default function CurrentWeather({temp, unit, city, description, rainChance, humidity, wind, code}){
    const WeatherIcon = WeatherIcons[code];
    return(
        <div className="current-city_content">
            <h3 className="current-city_name">
                <MapPin />
                {city}
            </h3>
            <div className="current-city_temp">
                <h4 className="weather-temp">{temp}<span>{unit}</span></h4>
                <div className="weather-icon">{WeatherIcon && <WeatherIcon size={100} />}</div>
            </div>
            <div className="current-city_desc">
                {description }
            </div>
            <div className="current-city_items row">
                <div className="current-city_item">
                    <Droplet />
                    <p>
                        میزان بارندگی
                        <span className="d-block">{rainChance} %</span>
                    </p>
                </div>
                <div className="current-city_item">
                    <Wind />
                    <p>
                        باد 
                        <span className="d-block">{wind}</span>
                    </p>
                </div>
                <div className="current-city_item">
                    <Droplet />
                    <p>
                        رطوبت
                        <span className="d-block">{humidity}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}