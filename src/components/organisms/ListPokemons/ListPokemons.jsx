import { useEffect, useState } from 'react';
import './_list_pokemons.scss';
import Input from '../../atoms/Input/Input';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';

function ListPokemons(props) {
    const [allPokemons, setAllPokemons] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");
    const [gen, setGen] = useState(1);
    const [language, setLanguage] = useState("fr");

    useEffect(() => {    
        const fetchData = async () => {            
            const res = await fetch(`https://tyradex.vercel.app/api/v1/gen/${gen}`);
            const data = await res.json();
            setAllPokemons(search ? data.filter(poke => poke.name[language].startsWith(search)) : data);
        } 
        fetchData();
    }, [search, gen])
    

    const tab = [];
    for (let i = 1; i <= 9; i++) {
        tab.push(i);
    }

    return (
        <div id='listPoke'>
            {console.log(allPokemons)}
            <div>
                <Input label="Recherche" type="search" onChange={(e) => setSearch(e.target.value)} />
                <div>
                    <select onChange={(e) => setGen(e.target.value)}>
                        {tab.map((element, i) => (
                            <option key={i}>{element}</option>
                        ))}
                    </select>
                </div>
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
                    <div key={i} onClick={() => setOpenModal(true)}>
                        <div>
                            <h1>{element.name[language]}</h1>
                            <div>
                                <span>{element.stats.hp}</span>
                                {element.types.map((type, key) => (
                                    <>
                                        <img src={type.image} alt="" key={key} />
                                    </>
                                ))}
                            </div>
                        </div>
                        <div>
                            <img src={element.sprites.regular} alt="" />
                        </div> 
                        <div>
                            <div>
                            {element.evolution !== null ? element.evolution.pre !== null ? element.evolution.pre.map((evolution) => {
                                return allPokemons.filter(pokemon => pokemon.pokedex_id == evolution.pokedex_id).map((evo, key) => (
                                    <>
                                        <img src={evo.sprites.regular} alt="" key={key} width="60px" />
                                    </>
                                ))
                            }
                            ) : "" : ""}
                            </div>
                            <div>
                            {element.evolution !== null ? element.evolution.next !== null ? element.evolution.next.map((evolution) => {
                                return allPokemons.filter(pokemon => pokemon.pokedex_id == evolution.pokedex_id).map((evo, key) => (
                                    <>
                                        <img src={evo.sprites.regular} alt="" key={key} width="60px" />
                                    </>
                                ))
                            }
                            ) : "" : ""}
                            </div>
                        </div>                       
                    </div>
                )) : (<h1>Aucune donnée</h1>)}
            </div>
            {openModal && <Modal closeModal={setOpenModal} />}
        </div>
    );
}

export default ListPokemons;