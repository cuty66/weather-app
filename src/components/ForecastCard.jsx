import { Droplet } from "lucide-react";
import WeatherIcons from "../utils/weatherIcons";

export default function ForecastCard({hour, temp, rainChance, code}) {
    const WeatherIcon = WeatherIcons[code];
    return(
        <div className="forecast-card">
            <span>
                {new Date(hour).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                })}
            </span>
            <span className="forecast-card_icon">{WeatherIcon && <WeatherIcon size="24" />}</span>
            <h5 className="forecast-card_temp">{temp}</h5>
            <span className="forecast-card_rain"><Droplet />{rainChance}%</span>
        </div>
    )
}