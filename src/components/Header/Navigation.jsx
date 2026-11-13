import { NavLink } from "react-router-dom";
import { Home, MapPin  } from "lucide-react"

export default function Navigation(){ 
    return(
        <nav className="nav-bottom">
            <NavLink to="/" end>
                <Home size={16} />
                صفحه اصلی
            </NavLink>
            <NavLink to="/city">
                <MapPin size={16} />
                شهرها
            </NavLink>
        </nav>
    )
}