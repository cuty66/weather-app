import ForecastCard from "./ForecastCard";

export default function TodaysForecast() {
    return(
        <div className="forecast-wrapper">
            <h3 className="forecast-title">
                TODAY'S FORECAST
            </h3>
            <ForecastCard />
        </div>
    )
}