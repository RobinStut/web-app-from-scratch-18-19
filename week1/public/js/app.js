var link = 'https://pokeapi.co/api/v2/pokemon'
var requestAPI = new XMLHttpRequest();
var requestPokemon = new XMLHttpRequest();
var pokeAPI = '';
var pokeAPI2 = '';

// met behulp van bron: https://codepen.io/joostf/pen/OQxpxx?editors=1010

var loadData = new Promise(function(resolve, reject){
    var request = new XMLHttpRequest();
    request.open('GET', link, true)

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
       // Success!
        pokeAPI = JSON.parse(request.responseText);
        resolve(pokeAPI);
        console.log('gelukt');


        //     // Start of loop
        pokeAPI.results.forEach(function(item) {
          // multipleLinks()
          var element = document.getElementById("wrapper");
          //console.log(item.name);
          //console.log(item.url);
          element.innerHTML +=
          `
          <div class="pokemoncard" data-index=${item}>
          <p>${item.name}
          https://pokeapi.co/api/v2/pokemon/${item.name}/</p>
          <a href="${item.url}">${item.name}</a>
          </div>
          `
        })

        pokeAPI.results.forEach(function(item2){
           console.log(item2);
         var loadData2 = new Promise((resolve, reject) => {
             requestPokemon.open("GET", link.item2, true)
             requestPokemon.onload = function(e) {
               pokeAPI2 = JSON.parse(requestPokemon.responseText);
               resolve(pokeAPI2);
               console.log(item2)
               }
             requestPokemon.send()
         })
         }
         )

      } else {
       // We reached our target server, but it returned an error
        reject(error);
      }
    };

    request.onerror = () => {
      // There was a connection error of some sort
    };

    request.send();
  });
