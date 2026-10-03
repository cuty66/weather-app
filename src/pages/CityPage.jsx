import CityList from "../components/CityList";
import Search from "../components/Search";

export default function CityPage(){
    return(
        <div className="city-page">
            <h1 className="page-title">My Cities</h1>
            <Search />
            <CityList />
        </div>
    )
}