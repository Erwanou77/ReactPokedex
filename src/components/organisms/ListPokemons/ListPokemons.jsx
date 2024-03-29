import { useEffect, useState } from 'react';
import './_list_pokemons.scss';
import Input from '../../atoms/Input/Input';
import Modal from '../Modal/Modal';
import { GoHeart, GoHeartFill } from 'react-icons/go'

function ListPokemons({allPokemons, search, gen, setLanguage, language}) {
    const [openModal, setOpenModal] = useState(false);
    const [onePokemon, setOnePokemon] = useState({});
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);

    const pokemonTypes = {
        "Psy": "bg-yellow-300 bg-gradient-to-br from-yellow-300 to-red-400",
        "Vol": "bg-blue-400 bg-gradient-to-br from-blue-400 to-indigo-600",
        "Dragon": "bg-red-600 bg-gradient-to-br from-red-600 to-yellow-300",
        "Feu": "bg-red-600 bg-gradient-to-br from-red-600 to-yellow-300",
        "Électrik": "bg-yellow-300 bg-gradient-to-br from-yellow-300 to-red-400",
        "Glace": "bg-blue-300 bg-gradient-to-br from-blue-300 to-blue-500",
        "Normal": "bg-gray-400 bg-gradient-to-br from-gray-400 to-gray-600",
        "Roche": "bg-gray-600 bg-gradient-to-br from-gray-600 to-gray-900",
        "Eau": "bg-blue-500 bg-gradient-to-br from-blue-500 to-blue-700",
        "Insecte": "bg-green-500 bg-gradient-to-br from-green-500 to-green-700",
        "Fée": "bg-pink-300 bg-gradient-to-br from-pink-300 to-pink-500",
        "Plante": "bg-green-600 bg-gradient-to-br from-green-600 to-green-900",
        "Sol": "bg-yellow-600 bg-gradient-to-br from-yellow-600 to-yellow-900",
        "Poison": "bg-purple-600 bg-gradient-to-br from-purple-600 to-purple-900",
        "Combat": "bg-red-900 bg-gradient-to-br from-red-900 to-red-600",
        "Spectre": "bg-indigo-800 bg-gradient-to-br from-indigo-800 to-indigo-900",
        "Acier": "bg-gray-800 bg-gradient-to-br from-gray-800 to-gray-900",
        "Ténèbres": "bg-black"
    };

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (item) => {
        setFavorites(prevFavorites => prevFavorites.some(fav => fav.pokedex_id === item.pokedex_id) ? prevFavorites.filter(fav => fav.pokedex_id !== item.pokedex_id) : [...prevFavorites, item]);
    };
    return (
        <div>
            <div id='listPoke'>
                <div>
                    <Input label="Recherche" type="search" onChange={(e) => search(e.target.value)} />
                    {gen && (
                        <div>
                            <select onChange={(e) => gen(e.target.value)}>
                                {Array.from({ length: 9 }, (_, i) => (
                                    <option key={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                    )}                    
                    <div>
                        <select onChange={(e) => setLanguage(e.target.value)}>
                            <option value="fr">fr</option>
                            <option value="en">en</option>
                            <option value="jp">jp</option>
                        </select>
                    </div>
                </div>
                <div>
                    {allPokemons.length > 0 ? allPokemons.map((element, i) => (                    
                        <div key={i} className={pokemonTypes[element.types[0].name]}>
                            <div>
                                <h1>{element.name[language]}</h1>
                                <div>
                                    <h4>{element.stats.hp}</h4>
                                    {element.types.map((type, key) => (
                                        <img src={type.image} alt="" />
                                    ))}
                                </div>
                            </div>
                            <div onClick={() => setOpenModal(true) & setOnePokemon(element)}>
                                <img src={element.sprites.regular} alt="" />
                            </div>
                            <div>
                                <button onClick={() => toggleFavorite(element)}>
                                    {favorites.some(fav => fav.pokedex_id === element.pokedex_id) ? <GoHeartFill /> : <GoHeart />}
                                </button>
                            </div> 
                            <div>
                                <div>
                                {element.evolution !== null && element.evolution.pre !== null && element.evolution.pre.map((evolution) => {
                                    return allPokemons.filter(pokemon => pokemon.pokedex_id == evolution.pokedex_id).map((evo, key) => (
                                        <img src={evo.sprites.regular} alt="" key={key} width="60px" />
                                    ))
                                })}
                                </div>
                                <div>
                                {element.evolution !== null && element.evolution.next !== null && element.evolution.next.map((evolution) => {
                                    return allPokemons.filter(pokemon => pokemon.pokedex_id == evolution.pokedex_id).map((evo, key) => (
                                        <img src={evo.sprites.regular} alt="" key={key} width="60px" />
                                    ))
                                })}
                                </div>
                            </div>                       
                        </div>
                    )) : (<h1>Aucune donnée</h1>)}
                </div>
            </div>
            {openModal && <Modal closeModal={setOpenModal} pokemonTypes={pokemonTypes} pokemon={onePokemon} language={language} allPokemons={allPokemons}/>}
        </div>
    );
}

export default ListPokemons;