import React, { useEffect, useState } from 'react';
import ListPokemons from '../../organisms/ListPokemons/ListPokemons';

function Favorites() {
    const [allPokemons, setAllPokemons] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
    const [search, setSearch] = useState("");
    const [language, setLanguage] = useState("fr");
    const [SelectedTypes, setSelectedTypes] = useState([]);
    const [Pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let fetchedData=[];
            await Promise.all(
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (gen) => {
                    const res = await fetch(`https://tyradex.vercel.app/api/v1/gen/${gen}`);
                    const data = await res.json();
                    fetchedData = fetchedData.concat(data);
                })
            );
            return fetchedData;
        }
        fetchData()
        .then((data) => {
            setPokemons(data);
        })
        setAllPokemons(SelectedTypes.length!=0 ? search ? (JSON.parse(localStorage.getItem('favorites')) || []).filter(poke => poke.name[language].toLowerCase().startsWith(search.toLowerCase())).filter((e)=>SelectedTypes.every(r=> e.types.map((i)=>i.name).includes(r))) : (JSON.parse(localStorage.getItem('favorites')) || []).filter((e)=>SelectedTypes.every(r=> e.types.map((i)=>i.name).includes(r))):search ? (JSON.parse(localStorage.getItem('favorites')) || []).filter(poke => poke.name[language].toLowerCase().startsWith(search.toLowerCase())) : (JSON.parse(localStorage.getItem('favorites')) || []));
    }, [search,SelectedTypes]);
    
    return (
        <div>
            <ListPokemons allPokemons={allPokemons} search={setSearch} language={language} setLanguage={setLanguage} selectedTypes={SelectedTypes} setSelectedTypes={setSelectedTypes} Pokemons={Pokemons} />
        </div>
    );
}

export default Favorites;