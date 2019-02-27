var fixedLink = 'https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0'
var link = 'https://pokeapi.co/api/v2/pokemon'
var requestPokemon = new XMLHttpRequest();
var pokeAPI = '';
var pokeAPI2 = '';

// met behulp van bron: https://codepen.io/joostf/pen/OQxpxx?editors=1010

var loadData = new Promise(function(resolve, reject){
    var request = new XMLHttpRequest();
    request.open('GET', fixedLink, true)

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
       // Success!
        pokeAPI = JSON.parse(request.responseText);
        resolve(pokeAPI);
        console.log('gelukt');


        //     // Start of loop
        pokeAPI.results.forEach(function(item) {

// Begin nieuwe API

          var loadData2 = new Promise(function(resolve2, reject2){
              var request2 = new XMLHttpRequest();
              request2.open('GET', (link+"/"+item.name), true)

              request2.onload = () => {
                if (request2.status >= 200 && request2.status < 400) {
                 // Success!
                  pokeAPI2 = JSON.parse(request2.responseText);
                  resolve(pokeAPI2);
                  console.log(link+"/"+item.name);
                  // console.log(request2.responseText.sprites);

                  console.log(pokeAPI2);
                  var element = document.getElementById("wrapper");
                  element.innerHTML +=
                  `
                  <div class="pokemoncard">
                  <p class="pokeCP">CP <span>${pokeAPI2.base_experience}</span></p>
                  <img src="${pokeAPI2.sprites.front_default}" alt="">
                  <p class="pokeName">${toCap(item.name)}</p>
                  </div>

                  `
                  }
                else
                  {
                 // We reached our target server, but it returned an error
                  reject(error);
                }
              };

              request2.onerror = () => {
                // There was a connection error of some sort
              };

              request2.send();
            });

// einde nieuwe api




        })

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


  function toCap(string)
  {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
