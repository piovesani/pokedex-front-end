const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => Array(300).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()));

const html = pokemons => {

    const returnLi = pokemons.reduce((accumulator, pokemon) => {

        const types = pokemon.types.map(typeInfo => typeInfo.type.name);

        accumulator += `
        <li class="card ${types[0]}">
            <div class="circle">
            <img 
            class="card-image"
            alt="${pokemon.name}"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" />
            </div>
            
            <h2 class="card-title">#${pokemon.id}- ${pokemon.name}</h2>
            <p class="card-subtitle"><b>Tipo: </b>${types.join(' | ')}</p>
        </li>
        `

        return accumulator;
    }, '');

    document.querySelector('[data-js="pokedex"]').innerHTML = returnLi;
}


const fetchPokemon = () => {

    const pokemons = generatePokemonPromises();

    Promise.all(pokemons)
        .then(html);
}

fetchPokemon();