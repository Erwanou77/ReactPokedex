import { useEffect, useState } from 'react';
import ListPokemons from '../../organisms/ListPokemons/ListPokemons';
import './_pokemons.scss';

function Pokemons(props) {
    const [allPokemons, setAllPokemons] = useState([]);
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

    return (
        <div>
            <ListPokemons allPokemons={allPokemons} search={setSearch} gen={setGen} language={language} setLanguage={setLanguage} />
        </div>
    );
}

export default Pokemons;