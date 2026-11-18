    
import cities from "../data/cities.json";
import {normalizeText} from "./normalizeText";
function findCityByName(cityName) {
    const searchValue = normalizeText(cityName);

    return cities.find(city =>
        normalizeText(city.title) === searchValue ||
        city.slug.toLowerCase() === searchValue.toLowerCase()
    );
}

export default findCityByName;