import { Radar } from 'react-chartjs-2';
import './_modal.scss';
import { Chart, Filler, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { useRef, useState } from 'react';

function Modal({ closeModal, pokemon, language, allPokemons }) {
    const [isShiny, setisShiny] = useState(false);
    const ref=useRef();
    let data = {
        labels: Object.keys(pokemon.stats),
        datasets: [{
            borderColor: "#F8FFB0",
            backgroundColor: "rgba(248, 255, 176, .4)",
            data: Object.values(pokemon.stats)
        }] 
    }
    const audio=new Audio("https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/"+pokemon.pokedex_id+".ogg")

    Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);
    Chart.defaults.color = "white";
    return (
        <div id="modal">
            <div className={pokemon.types[0].name}>
                <div>
                    <h1>#{pokemon.pokedex_id} {pokemon.name[language]}</h1>
                    <div>
                        <h4>{pokemon.stats.hp}</h4>
                        {pokemon.types.map((type, key) => (
                                <img src={type.image} alt="" key={key} />
                        ))}
                    </div>
                </div>
                <div>
                    <img src={isShiny?pokemon.sprites.shiny:pokemon.sprites.regular} alt="" />
                </div> 
                <div>

                <button ref={ref} onClick={()=>setisShiny(!isShiny)}>{isShiny?"Normal":"Shiny"}</button>
                <button onClick={()=>audio.play()}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="25" viewBox="0 0 512 512" style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} xmlnsXlink="http://www.w3.org/1999/xlink">
      <g>
        <path style={{ opacity: 0.98 }} fill="#000000" d="M 511.5,226.5 C 511.5,245.833 511.5,265.167 511.5,284.5C 505.444,344.201 481.777,395.701 440.5,439C 439.833,439.667 439.167,439.667 438.5,439C 422.653,423.319 406.986,407.486 391.5,391.5C 445.023,332.384 459.523,264.718 435,188.5C 425.519,163.519 411.519,141.519 393,122.5C 392.018,121.241 391.685,119.908 392,118.5C 407.5,103 423,87.5 438.5,72C 439.167,71.3333 439.833,71.3333 440.5,72C 481.777,115.299 505.444,166.799 511.5,226.5 Z"/>
      </g>
      <g>
        <path style={{ opacity: 0.995 }} fill="#000000" d="M 253.5,95.5 C 254.833,148.496 255.5,201.829 255.5,255.5C 255.167,308.833 254.833,362.167 254.5,415.5C 212.167,383.667 169.833,351.833 127.5,320C 95.5017,319.5 63.5017,319.333 31.5,319.5C 31.5,276.833 31.5,234.167 31.5,191.5C 63.5017,191.667 95.5017,191.5 127.5,191C 169.748,159.389 211.748,127.556 253.5,95.5 Z"/>
      </g>
      <g>
        <path style={{ opacity: 0.978 }} fill="#000000" d="M 350.5,159.5 C 351.552,159.351 352.552,159.517 353.5,160C 398.582,200.831 410.082,249.664 388,306.5C 379.284,324.207 367.284,339.207 352,351.5C 338.027,338.694 324.527,325.361 311.5,311.5C 332.594,291.159 340.094,266.492 334,237.5C 332.225,228.84 328.892,220.84 324,213.5C 320.019,208.684 315.852,204.018 311.5,199.5C 324.521,186.146 337.521,172.813 350.5,159.5 Z"/>
      </g>
    </svg>
                </button>
                </div>
                <div>
                    <ul>
                        {pokemon.talents.map((talent,index) => (
                                <li key={index}>{talent.name}</li>
                        ))}
                    </ul>
                </div>
                <div>                    
                    <Radar data={data}/>
                </div>
                <div>
                    <div>
                    {pokemon.evolution !== null && pokemon.evolution.pre !== null && pokemon.evolution.pre.map((evolution) => {
                        return allPokemons.filter(poke => poke.pokedex_id == evolution.pokedex_id).map((evo, key) => (
                                <img src={isShiny?evo.sprites.shiny:evo.sprites.regular} alt="" key={key} width="60px" />
                        ))
                    }
                    )}
                    </div>
                    <div>
                    {pokemon.evolution !== null && pokemon.evolution.next !== null && pokemon.evolution.next.map((evolution) => {
                        return allPokemons.filter(poke => poke.pokedex_id == evolution.pokedex_id).map((evo, key) => (
                                <img src={isShiny?evo.sprites.shiny:evo.sprites.regular} alt="" key={key} width="60px" />
                        ))
                    }
                    )}
                    </div>
                </div> 
            </div>
            <div id="fermer">
            <button onClick={() => closeModal(false)}>fermer</button>
            </div>
        </div>
    );
}

export default Modal;