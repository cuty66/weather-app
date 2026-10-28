export default function ForecastCard({hour, temp, precipitation}) {
    return(
        <div className="forecast-card">
            <span>
                {new Date(hour).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                })}
            </span>
            <div>
                <span>icon</span>
                <span>Chance Of rain {precipitation}%</span>
                <h5>{temp}</h5>
            </div>
        </div>
    )
}