var link = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151'

// met behulp van bron: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
var requestAPI = new XMLHttpRequest();
requestAPI.open("GET", link, true);
requestAPI.onload = function(e) {
  if (requestAPI.status === 200) {
    console.log("Juiste status + tekst uitprinten");
    var pokeAPI = JSON.parse(requestAPI.responseText)
    // Loopt door object heen
    pokeAPI.results.forEach(function(pokemon) {
      console.log(pokemon.name + " " + pokemon.url);

      element = document.getElementById("jan");
      element.innerHTML +=

      `
      <div class="pokemoncard">
      <p>${pokemon.name}</p>
      <p>${pokemon.url}</p>
      </div>
      `

      // element.innerHTML = `${pokemon.map((item, i) =>{
      //   `<div class="incident">
      //         <p>Casenumber:${pokemon.name}</p>
      //   </div>`
      // })}`

//       element.innerHTML = `${pokemon
// .map((item, i) =>
//              `
//        <div class="incident">
//        <p>Casenumber:${pokemon.name}</p>
//
//        </div>
//      `.trim()
//            )
//            .join("")}
//    `;





    })
    // document.getElementById('joke').innerHTML = requestAPI.responseText;
  } else {
    console.error(requestAPI.statusText);
  }
};
requestAPI.onerror = function(e) {
  console.error(requestAPI.statusText);
};
requestAPI.send(null);


// document.getElementById('name').innerHTML = "test";
