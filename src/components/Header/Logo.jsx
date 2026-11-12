import { Link } from "react-router-dom";

export default function Logo(){
    return(
        <Link to="/">
            <div className="logo-wrapper">
                <img src="/images/logo.png" width={200} height={80} alt="Logo" />
            </div>
        </Link>
    )
}