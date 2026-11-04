import Navigation from './Navigation';
import Logo from './Logo';

export default function Header(){
    return(
        <header className='header'>
            <Navigation />
            <Logo />
        </header>
    )
}