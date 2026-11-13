import { Calendar } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ForecastCard from "./ForecastCard";

export default function TodaysForecast({todayCast}) {
    return(
        <div className="forecast-wrapper">
            <h3 className="forecast-title d-flex">
                <Calendar />
                پیش‌بینی آب‌وهوای امروز
            </h3>
            <div className="today-forecast-lists">
                <Swiper 
                    slidesPerView={2}
                    spaceBetween={12}
                    breakpoints={{
                        768: {
                            slidesPerView: 4,
                        },
                        1200: {
                            slidesPerView: 6,
                        }
                    }}>
                    { todayCast && todayCast.map( card => 
                        <SwiperSlide key={card.time}>
                            <ForecastCard 
                            hour={card.time} 
                            temp={card.temperature} 
                            rainChance={card.precipitation}
                            code={card.code}
                            />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    )
}