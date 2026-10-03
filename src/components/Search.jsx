import { useState } from "react"

export default function Search(){ 
    const [city, setCity] = useState("");
    function handleSearch(e){
        e.preventDefault();
        console.log(city)
    }
    return(
        <div className="search-wrapper">
            <form className="search-form" onSubmit={handleSearch}>
                <input 
                className="search-input"
                placeholder="search for cities" 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} />
            </form>
            {city}
        </div>
    )
}