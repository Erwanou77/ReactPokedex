import ListPokemons from '../../organisms/ListPokemons/ListPokemons';
import './_pokemons.scss';

function Pokemons(props) {
    return (
        <div key={"allpokemon"}>
            <ListPokemons />
        </div>
    );
}

export default Pokemons;