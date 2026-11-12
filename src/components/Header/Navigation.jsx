import { NavLink } from "react-router-dom";
import { Home, MapPin  } from "lucide-react"

export default function Navigation(){ 
    return(
        <nav className="nav-bottom">
            <NavLink to="/" end>
                <Home  />
                Home
            </NavLink>
            <NavLink to="/city">
                <MapPin />
                City
            </NavLink>
        </nav>
    )
}