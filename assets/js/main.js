const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButtom')
const secondpage = document.getElementById('secondpage')
const maxRecords = 151
const limit = 10
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `
            <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div> 
            </li>
            `).join('')
        pokemonList.innerHTML += newHtml;

        const pokemonItems = document.querySelectorAll('.pokemon');
        pokemonItems.forEach(pokemonItem => {
            pokemonItem.addEventListener('click', () => {
                const pokemonId = pokemonItem.getAttribute('data-id');
                window.location.href = `secondpage.html?id=${pokemonId}`;
            });
        });
    });
}

const pokemonId = new URLSearchParams(window.location.search).get('id');

if (pokemonId) {
    
    pokeApi.getPokemonById(pokemonId).then((pokemon) => {
        const newHtml = `<img id="img" class="pokemon ${pokemon.type}" src="${pokemon.photo}" alt="${pokemon.name}">
            <li id ="size" class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <div class="button-class">
                    <div class="rowclass widthbutton">
                        <button id="botao-status" type="button">
                            Stats
                        </button>
                    </div>
                    <div class="rowclass">
                        <button id="button-abilities" type="button"">
                            Abilities
                        </button>
                    </div>
                    <div class="rowclass">
                        <button id="button-about" type="button">
                            About
                        </button>
                    </div>
     
                </div>
                <div id="grid">
                    <div class="status" id="status-container">
                        <div class="divstatus">
                            <span class="firststatus">${pokemon.stat[0]}</span>
                            <span class="secondstatus">${pokemon.stat[1]}</span>
                            <span class="thirdstatus">${pokemon.stat[2]}</span>
                            <span class="fourthstatus">${pokemon.stat[3]}</span>
                            <span class="fifthstatus">${pokemon.stat[4]}</span>
                            <span class="sixthstatus">${pokemon.stat[5]}</span>                 
                        </div>
                        <div class="divstatus widthstats">
                            <span class="firststatus sizestatus">${pokemon.stats[0]}</span>
                            <span class="secondstatus sizestatus">${pokemon.stats[1]}</span>
                            <span class="thirdstatus sizestatus">${pokemon.stats[2]}</span>
                            <span class="fourthstatus sizestatus">${pokemon.stats[3]}</span>
                            <span class="fifthstatus sizestatus">${pokemon.stats[4]}</span>
                            <span class="sixthstatus sizestatus">${pokemon.stats[5]}</span>
                        </div>
                    </div>
                    <div class="abilitiesClass" id="abilitiesId">
                        ${pokemon.abilities.map((ability) => `<div>${ability}</div>`).join('')}
                    </div>
                    <div class ="aboutClass" id="aboutId">
                        <span class="firstabout">Base xp: ${pokemon.base_experience}</span>
                        <span class="secondabout">Height: ${pokemon.height}</span>
                        <span>Weight: ${pokemon.weight}</span>
                    </div>
                </div>
            </li>
            `;

        secondpage.innerHTML = newHtml;
        
        let statusContainer = document.getElementById('status-container')
        let botaoStatus = document.getElementById('botao-status')
        let back = document.getElementById('back')
        statusContainer.style.display = 'none'
        if (botaoStatus) {
            botaoStatus.addEventListener ('click', () => {
                if(statusContainer.style.display === 'none') {
                    statusContainer.style.display = 'block'
                    if (statusContainer.style.display === 'block') {
                        statusContainer.style.display = 'grid'
                        statusContainer.style.gridTemplateColumns = '1fr 1fr'
                        botaoStatus.style.backgroundColor = '#9e98ad'
                    }
                } else {
                    statusContainer.style.display = 'none'
                    botaoStatus.style.backgroundColor = '#FFF'
                }
            })
        } 
        let abilities = document.getElementById('abilitiesId')
        let abilitiesButton = document.getElementById('button-abilities')
        abilities.style.display = 'none'
        if (abilitiesButton) {
            abilitiesButton.addEventListener('click', () => {
                if (abilities.style.display === 'none') {
                    abilities.style.display = 'block'
                    abilitiesButton.style.backgroundColor = '#9e98ad'
                } else {
                    abilities.style.display = 'none'
                    abilitiesButton.style.backgroundColor = '#FFF'
                }
            })
        }
        let about = document.getElementById('aboutId')
        let buttonAbout = document.getElementById('button-about')
        about.style.display = 'none'
        if (buttonAbout) {
            buttonAbout.addEventListener('click', () => {
                if (about.style.display === 'none') {
                    about.style.display = 'block'
                    buttonAbout.style.backgroundColor = '#9e98ad'
                } else {
                    about.style.display = 'none'
                    buttonAbout.style.backgroundColor = '#FFF'
                }
            })
        } if (back) {
            back.addEventListener('click', () => {
                window.location.href = `index.html`
            })
        } 
    })
        
} else {
    loadPokemonItens(offset, limit);

    loadMoreButton.addEventListener('click', () => {
        offset += limit
    
        const qtdRecordNextPage = offset + limit
    
        if (qtdRecordNextPage >= maxRecords) {
            const newLimit = maxRecords - offset
            loadPokemonItens(offset, newLimit)
    
            loadMoreButton.parentElement.removeChild(loadMoreButton)
        } else {
            loadPokemonItens(offset, limit)
        }
    })
}
