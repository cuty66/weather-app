import { Link } from "react-router-dom";

export default function Navigation(){ 
    return(
        <nav className="nav-bottom">
            <Link to="/">Home</Link>
            <Link to="/city">City</Link>
        </nav>
    )
}