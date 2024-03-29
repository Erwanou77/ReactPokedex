import React, { useEffect, useState } from 'react';
import ListPokemons from '../../organisms/ListPokemons/ListPokemons';

function Favorites() {
    const [allPokemons, setAllPokemons] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
    const [search, setSearch] = useState("");
    const [language, setLanguage] = useState("fr");

    useEffect(() => {
        setAllPokemons(search ? (JSON.parse(localStorage.getItem('favorites')) || []).filter(poke => poke.name[language].toLowerCase().startsWith(search.toLowerCase())) : JSON.parse(localStorage.getItem('favorites')) || []);
    }, [search])
    
    return (
        <div>
            <ListPokemons allPokemons={allPokemons} search={setSearch} language={language} setLanguage={setLanguage} />
        </div>
    );
}

export default Favorites;