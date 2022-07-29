"use strict"

const url = 'https://pokeapi.co/api/v2/pokemon?limit=102&offset=0'

const getData = () => {

    fetch(url) //hacemos la peticion
        .then((response) => { // en la respuesta retornamos la petición
            return response.json();
        })
        .then((data) => {
            data.results.forEach(element => {
                fetch(element.url)
                    .then((response) => {
                        return response.json()
                            .then((response) => {
                                console.log(response);
                                const card = document.createElement("div");
                                card.classList.add("col-md-2", "d-flex", "flex-column", "tarjetas");
                                card.innerHTML = `
                                    <img class="imgPok" src="${response.sprites.front_default}">
                                    <h5 class="datosPok"> ID: ${response.id}</h5>
                                    <h4 class="datosPok"> Name: ${response.name}</h4>  
                                `;               
                                pokemon_todo.appendChild(card);       
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            });
        })
        .catch((error) => {
            console.error(error);
        })
}

const getRandomAsideWhenLoad = () => {

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let arrayRandom = Math.floor(Math.random() * data.results.length);
            buscarPokemon(data.results[arrayRandom].name);
        })
        .catch((error) =>{
            console.error(error);
        })
}

getData()
getRandomAsideWhenLoad()

const entrada = document.getElementById("input_todo");

entrada.addEventListener("keyup",(event) => {
    event.preventDefault();
    buscarPokemon(entrada.value);
})

function buscarPokemon(pokemon) {

    if(pokemon == "") {
        getRandomAsideWhenLoad();
    }
    else{
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
            .then((response) => response.json())
            .then((data) => {
                buscar(data);
            
            });
    }        
}

function buscar(pokemon) {

    const elementoPadre = document.getElementById("elementoPadre");
    elementoPadre.innerHTML = "";
    const elementoHijo = document.createElement("div");
    elementoHijo.classList.add("d-flex", "flex-column", "mx-auto", "justify-content-center", "align-items-center", "pokemonAside");
    
    elementoHijo.innerHTML = `
        <img class="imgAside" src="${pokemon.sprites.front_default}">
        <h5 class="datosPok"> Name: ${pokemon.name}</h5>
        <h6 class="datosPok"> ABILITIES: ${pokemon.abilities[0].ability.name}</h6>
        <h6 class="datosPok"> WEIGHT: ${pokemon.weight}</h6>
        <h6 class="datosPok"> TYPES: ${pokemon.types[0].type.name}</h6>
    `;
  elementoPadre.appendChild(elementoHijo);
  
}
