import { Link } from 'react-router-dom';
import './_navbar.scss';

function Navbar(props) {
    return (
        <nav>
            <ul>
                <li><Link to='/'>Accueil</Link></li>
                <li><Link to='/favorites'>Mon pokedex</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;