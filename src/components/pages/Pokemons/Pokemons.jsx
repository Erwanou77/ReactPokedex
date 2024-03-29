import { useEffect, useState } from 'react';
import ListPokemons from '../../organisms/ListPokemons/ListPokemons';
import './_pokemons.scss';

function Pokemons(props) {
    const [allPokemons, setAllPokemons] = useState([]);
    const [search, setSearch] = useState("");
    const [gen, setGen] = useState(1);
    const [language, setLanguage] = useState("fr");
    const [SelectedTypes, setSelectedTypes] = useState([]);
    const [Pokemons, setPokemons] = useState([]);

    useEffect(() => {    
        const fetchData = async () => {            
            const res = await fetch(`https://tyradex.vercel.app/api/v1/gen/${gen}`);
            const data = await res.json();
            setPokemons(data)
            setAllPokemons(SelectedTypes.length!=0 ? search ? data.filter(poke => poke.name[language].toLowerCase().startsWith(search.toLowerCase())).filter((e)=>SelectedTypes.every(r=> e.types.map((i)=>i.name).includes(r))) : data.filter((e)=>SelectedTypes.every(r=> e.types.map((i)=>i.name).includes(r))):search ? data.filter(poke => poke.name[language].toLowerCase().startsWith(search.toLowerCase())) : data);
        }
        fetchData();
    }, [search, gen, SelectedTypes])

    return (
        <div>
            <ListPokemons allPokemons={allPokemons} search={setSearch} gen={setGen} language={language} setLanguage={setLanguage} selectedTypes={SelectedTypes} setSelectedTypes={setSelectedTypes} Pokemons={Pokemons} />
        </div>
    );
}

export default Pokemons;