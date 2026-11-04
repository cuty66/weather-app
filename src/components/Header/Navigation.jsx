import { Link } from "react-router-dom";
import { Home, MapPin  } from "lucide-react"

export default function Navigation(){ 
    return(
        <nav className="nav-bottom">
            <Link to="/">
                <Home  />
                Home
            </Link>
            <Link to="/city">
                <MapPin />
                City
            </Link>
        </nav>
    )
}