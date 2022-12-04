const pokeApi = {}

function pokeDetailToPokemon(pokemonDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name
    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => fetch(pokemon.url).then((response) => response.json().then(pokeDetailToPokemon))


pokeApi.getPokemons = function(offset, limit){
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokemon) => this.getPokemonDetail(pokemon)))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
    }

    
