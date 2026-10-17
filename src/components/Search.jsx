
export default function Search({onSearch, myCity, onCity}){ 
    
    return(
        <div className="search-wrapper">
            <form className="search-form" onSubmit={onSearch}>
                <input 
                className="search-input"
                placeholder="search for cities" 
                type="text" 
                value={myCity} 
                onChange={onCity} />
            </form>
        </div>
    )
}