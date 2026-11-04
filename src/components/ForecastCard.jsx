export default function ForecastCard({hour, temp, rainChance}) {
    return(
        <div className="forecast-card">
            <span>
                {new Date(hour).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                })}
            </span>
            <div className="forecast-card_content">
                <span>icon</span>
                <span>Chance Of rain {rainChance}%</span>
                <h5>{temp}</h5>
            </div>
        </div>
    )
}