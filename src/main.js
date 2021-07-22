

const pokedex = document.getElementById("pokedex");
const searchBar = document.getElementById("search-bar");
let pokemon =[];
searchBar.addEventListener('keyup',(e) =>{

    const searchString = e.target.value ;

    const filteredpokemons = pokemon.filter ((pakemon) =>{
    
        
      return  pakemon.name.includes(searchString) 
        


    }) 

    
    displayPokemon(filteredpokemons);
}


)



const fetchPokemon = async () =>{
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(pokemon)
    pokemon = data.results.map((result, index)=>({

            name : result.name , 
            id: index + 1 ,
            image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
            
        


    }))

    displayPokemon(pokemon);
    
    

};





const displayPokemon= (pokemon)=>{

        console.log(pokemon);
        const pokemonHTMLstring = pokemon.map (Pokemon => 
            `
            <li class="card" onclick="selectPokemon(${Pokemon.id})">

                <img class="card-img"src= "${Pokemon.image}"/>
                <h2 class="card-title"> ${Pokemon.id}. ${Pokemon.name}  </h2>
                
            
            </li>
            `).join ('');

            pokedex.innerHTML = pokemonHTMLstring ;

};

const selectPokemon = async (id) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const Pokemon= await res.json();
    displayPopUP(Pokemon);
}


const displayPopUP = (Pokemon) =>{
    console.log(Pokemon);
    const image = Pokemon.sprites['front_default'];
    const type = Pokemon.types.map( type => 
        type.type.name).join(', ')
        const HTMLstring =` 
        <div class="popup">
            <i class='bx bx-x-circle' type="button" id ="close" onclick="closePopUp()"></i>
            <div class="card" onclick="selectPokemon(${Pokemon.id})">

                <img class="card-img"src= "${image}"/>
                <h2 class="card-title"> ${Pokemon.id}. ${Pokemon.name}  </h2>
                <p><small>Height:</small>${Pokemon.height} |<small>Weight:</small>${Pokemon.weight} | 
                <small>Type:</small>${type}</p>
                
            
            </div>
        </div>
        
        
        `

        pokedex.innerHTML = HTMLstring + pokedex.innerHTML ;

        console.log(HTMLstring);
}



const closePopUp = () => {

    const popup = document.querySelector(".popup");
    popup.parentElement.removeChild(popup);
}


fetchPokemon();

