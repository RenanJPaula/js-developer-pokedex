function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const pokemonList = document.getElementById('pokemonList')
let offset = 0
const maxRecords = 151
const limit = 10
function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemonListJson = []) => {
        const newHtml = pokemonListJson.map((pokemon) =>`
            <li class="pokemon ${pokemon.type}">
                <p class="numero">#${pokemon.number}</p>
                <p class="nome">${capitalizeFirstLetter(pokemon.name)}</p>
                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>`).join('')
        pokemonList.innerHTML += newHtml
        console.log(offset, limit)
    })
}
loadPokemonItens(offset, limit)
const botao = document.getElementById('loadMoreItens')
botao.addEventListener('click', () => {
    offset += limit
    const qtdRecordNexPage = offset + limit
    
    if (qtdRecordNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        botao.parentElement.removeChild (botao)
    } else {
        loadPokemonItens(offset, limit)
    }
})