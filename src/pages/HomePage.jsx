import CurrentWeather from "../components/CurrentWeather";
import TodaysForecast from "../components/TodaysForecast";

export default function HomePage(){
    return(
        <div className="home-page">
            <CurrentWeather />
            <TodaysForecast />
        </div>
    )
}