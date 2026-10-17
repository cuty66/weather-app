import ForecastCard from "./ForecastCard";

export default function TodaysForecast({todayCast}) {
    return(
        <div className="forecast-wrapper">
            <h3 className="forecast-title">
                TODAY'S FORECAST
            </h3>
            <div className="today-forecast-lists">
                { todayCast && todayCast.map( card => 
                    <ForecastCard key={card.time} hour={card.time} temp={card.temperature} />
                )}
            </div>
        </div>
    )
}