import Navigation from './Navigation';
import Logo from './Logo';

export default function Header(){
    return(
        <header className='header'>
            <div className="container">
                <div className="row">
                    <Navigation />
                    <Logo />
                </div>
            </div>
        </header>
    )
}