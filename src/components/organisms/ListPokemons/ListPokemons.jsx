import { useEffect, useState } from 'react';
import './_list_pokemons.scss';
import Input from '../../atoms/Input/Input';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import SelectMultiple from '../../atoms/SelectMultiple/SelectMultiple';

function ListPokemons(props) {
    const [Pokemons, setPokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");
    const [gen, setGen] = useState(1);
    const [language, setLanguage] = useState("fr");
    const [Types, setTypes] = useState([]);

    useEffect(() => {    
        const fetchData = async () => {            
            const res = await fetch(`https://tyradex.vercel.app/api/v1/gen/${gen}`);
            const data = await res.json();
            setTypes([])
            setPokemons(data)
            setAllPokemons(search ? data.filter(poke => poke.name[language].toLowerCase().startsWith(search.toLowerCase())) : data);
        } 
        fetchData();
    }, [search, gen])
    

    const tab = [];
    for (let i = 1; i <= 9; i++) {
        tab.push(i);
    }
    const handleSelectionChange = (selectedOptions) => {
        console.log(selectedOptions);
      };
      const opt=[]

    return (
        <div id='listPoke'>
            <div key={"renderPokemon"}>
                <Input label="Recherche" type="search" onChange={(e) => setSearch(e.target.value)} />
                <div>
                    <select onChange={(e) => setGen(e.target.value)}>
                        {tab.map((element, i) => (
                            <option key={"option"+i}>{element}</option>
                        ))}
                    </select>
                </div>
                <SelectMultiple options={Types} onChange={handleSelectionChange} />
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
                    <div key={"pokemon"+i} onClick={() => setOpenModal(true)}>
                        <div key={"souspokemon"+i}>
                            <h1 key={element.name[language]}>{element.name[language]}</h1>
                            <div key={"type"+i}>
                                <span key={"hp"+i}>{element.stats.hp}</span>
                                {element.types.map((type, k) => {
                                    !Types.includes(type.name) && setTypes([...Types, type.name]);
                                    return (

                                        <img src={type.image} alt="" key={"image"+i+k} />
                                )})}
                            </div>
                        </div>
                        <div key={"imageOther"+i}>
                            <img src={element.sprites.regular} alt="" />
                        </div> 
                        <div>
                            <div>
                            {element.evolution !== null ? element.evolution.pre !== null ? element.evolution.pre.map((evolution) => {
                                return Pokemons.filter(pokemon => pokemon.pokedex_id == evolution.pokedex_id).map((evo, key) => (
                                        <img src={evo.sprites.regular} alt="" key={"imageEvo"+key} width="60px" />
                                ))
                            }
                            ) : "" : ""}
                            </div>
                            <div>
                            {element.evolution !== null ? element.evolution.next !== null ? element.evolution.next.map((evolution) => {
                                return Pokemons.filter(pokemon => pokemon.pokedex_id == evolution.pokedex_id).map((evo, key) => (
                                        <img src={evo.sprites.regular} alt="" key={"imageEvo"+key} width="60px" />
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