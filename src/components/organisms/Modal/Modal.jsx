import { Radar } from 'react-chartjs-2';
import './_modal.scss';
import { Chart, Filler, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';

function Modal({ closeModal, pokemon, language, allPokemons }) {
    Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);
    let data = {
        labels: Object.keys(pokemon.stats),
        datasets: [{
            borderColor: "#F8FFB0",
            backgroundColor: "rgba(248, 255, 176, .4)",
            data: Object.values(pokemon.stats)
        }] 
    }
    return (
        <div id="modal" onClick={() => closeModal(false)}>
            <div>
                <div>
                    <h1>{pokemon.name[language]}</h1>
                    <div>
                        <h4>{pokemon.stats.hp}</h4>
                        {pokemon.types.map((type, key) => (
                            <>
                                <img src={type.image} alt="" key={key} />
                            </>
                        ))}
                    </div>
                </div>
                <div>
                    <img src={pokemon.sprites.regular} alt="" />
                </div> 
                <div>
                    <ul>
                        {pokemon.talents.map(talent => (
                            <>
                                <li>{talent.name}</li>
                            </>
                        ))}
                    </ul>
                </div>
                <div>                    
                    <Radar data={data}  />
                </div>
                <div>
                    <div>
                    {pokemon.evolution !== null ? pokemon.evolution.pre !== null ? pokemon.evolution.pre.map((evolution) => {
                        return allPokemons.filter(poke => poke.pokedex_id == evolution.pokedex_id).map((evo, key) => (
                            <>
                                <img src={evo.sprites.regular} alt="" key={key} width="60px" />
                            </>
                        ))
                    }
                    ) : "" : ""}
                    </div>
                    <div>
                    {pokemon.evolution !== null ? pokemon.evolution.next !== null ? pokemon.evolution.next.map((evolution) => {
                        return allPokemons.filter(poke => poke.pokedex_id == evolution.pokedex_id).map((evo, key) => (
                            <>
                                <img src={evo.sprites.regular} alt="" key={key} width="60px" />
                            </>
                        ))
                    }
                    ) : "" : ""}
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default Modal;