var link = 'https://pokeapi.co/api/v2/pokemon'
var link2 = 'https://pokeapi.co/api/v2/pokemon'

// var i = 0
// met behulp van bron: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
var requestAPI = new XMLHttpRequest();
var requestPokemon = new XMLHttpRequest();
requestAPI.open("GET", link, true);
requestAPI.onload = async function(e) {
  if (requestAPI.status === 200) {
    console.log("Juiste status + tekst uitprinten");
    var pokeAPI = JSON.parse(requestAPI.responseText)
    //console.log(pokeAPI)
    var pokemonArray = []

    // console.log(pokeAPI)
    // Loopt door object heen
    for (let i = 0; i < pokeAPI.results.length; i++) {
  
      let pokemonDetails = await getData(i);

      console.log(pokemonDetails)
      console.log(pokemonDetails.sprites.front_default)

      element = document.getElementById("wrapper");
      element.innerHTML +=

      `
      <div class="pokemoncard" data-index=${i}>
      <img url"${pokemonDetails.sprites.front_default}">
      <p>${pokeAPI.results[i].name}
      https://pokeapi.co/api/v2/pokemon/${pokeAPI.results[i].name}/</p>
      <a href="${pokeAPI.results[i].url}">${pokeAPI.results[i].name}</a>
      </div>
      `
    }



  } else {
    console.error(requestAPI.statusText);
  }
};
requestAPI.onerror = function(e) {
  console.error(requestAPI.statusText);
};
requestAPI.send(null);

function getData(i) {
  return new Promise((resolve, reject) => {
    requestPokemon.open("GET", `https://pokeapi.co/api/v2/pokemon/${i+1}`, true)
    requestPokemon.onload = function (e) {
      // console.log(requestPokemon)
      resolve(JSON.parse(requestPokemon.responseText))

    }
    requestPokemon.send()
  })
}
