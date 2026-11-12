import { useState } from "react";
export default function useLocation() {
    const [location, setLocation] = useState({});
    function getLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                setLocation({
                    latitude,
                    longitude
                });
            },
            (error) => {
                console.log(error)
            }
        )
    }
    
    return {location, getLocation}
}