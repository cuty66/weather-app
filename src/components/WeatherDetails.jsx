import { Gauge, Eye, Sunrise, Thermometer } from "lucide-react";
import "swiper/css";

export default function WeatherDetails({feelsLike, visibility, pressure, sunrise}) {
    return(
        <div className="weather-details_wrapper d-flex">
            <div className="weather-detail_item d-flex">
                <Thermometer />
                <p>
                    <span>feels Like</span>
                    <strong className="d-block">{feelsLike} °C</strong>
                </p>
            </div>
            <div className="weather-detail_item d-flex">
                <Eye />
                <p>
                    <span>Visibility</span>
                    <strong className="d-block">{visibility}</strong>
                </p>
            </div>
            <div className="weather-detail_item d-flex">
                <Gauge />
                <p>
                    <span>Pressure</span>
                    <strong className="d-block">{pressure}</strong>
                </p>
            </div>
            <div className="weather-detail_item d-flex">
                <Sunrise />
                <p>
                    <span>Sunrise</span>
                    <strong className="d-block">{sunrise}</strong>
                </p>
            </div>
        </div>
    )
}