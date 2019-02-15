var fixedLink = 'https://pokeapi.co/api/v2/pokemon/?limit=3&offset=0'
var link = 'https://pokeapi.co/api/v2/pokemon'
var requestPokemon = new XMLHttpRequest();
var pokeAPI = '';
var pokeAPI2 = '';
var pokeFiltered = {};
var pokeArray = [];
console.log(pokeArray);

// begin router
var router = {
  routieF: function(){routie(':name', name => {
    console.log(name);
    render.detail(name);
  })
},
  overview: function() {
    console.log('//stap 2'); // stap 2
    console.log('object api.get aanspreken');
    api.get('overview')

  },
  route: '/',
  detail: function(id) {}


};
// eind router

// api

var api = {
  get: function(route) {

    // stap 3
    console.log('//stap 3');
    // fetch data from api

    var loadData = new Promise(function(resolve, reject){
        var route = new XMLHttpRequest();
        route.open('GET', fixedLink, true)

        route.onload = () => {
          if (route.status >= 200 && route.status < 400) {
           // Success!
            api.parse(route);
            // pokeAPI = JSON.parse(request.responseText);
            resolve(pokeAPI);
            console.log('parsing gelukt');

            //     // Start of loop

            pokeAPI.results.forEach(function(item) {

    // Begin nieuwe API

              var loadData2 = new Promise(function(resolve2, reject2){
                  var route2 = new XMLHttpRequest();
                  route2.open('GET', (link+"/"+item.name), true)

                  route2.onload = () => {

                    if (route2.status >= 200 && route2.status < 400) {
                     // Success!

                      // pokeAPI2 = JSON.parse(route2.responseText);
                      resolve(pokeAPI2);
                      console.log(link+"/"+item.name);
                      // console.log(route2.responseText);
                      pokeArray.push(route2);
                      // console.log(pokeArray[0]);
                      console.log(route2);
                      console.log(pokeAPI2.base_experience);
                      // pushen naar array werkt

                      api.parse(route2);
                      pokeFiltered = {base_experience: pokeAPI2.base_experience, height: pokeAPI2.height, id: pokeAPI2.id, moves: pokeAPI2.moves, name: pokeAPI2.name, order: pokeAPI2.order, sprites: pokeAPI2.sprites, stats: pokeAPI2.stats, type: pokeAPI2.type, weight: pokeAPI2.weight}

                      render.overview();
                      router.routieF();
                      // router.routtie2('#'+pokeFiltered.name);

                      }
                    else
                      {
                     // We reached our target server, but it returned an error
                      reject(error);
                    }

                  };

                  route2.onerror = () => {
                    // There was a connection error of some sort
                  };

                  route2.send();
                });

    // einde nieuwe api

            })

          } else {
           // We reached our target server, but it returned an error
            reject(error);
          }
        };

        route.onerror = () => {
          // There was a connection error of some sort
        };

        route.send();
      });

    // this.parse(response); // this == api
  },

  parse: function(response) {
    // stap 4
    console.log('//stap 4');
    pokeAPI = JSON.parse(response.responseText);
    pokeAPI2 = JSON.parse(response.responseText);

    // console.log(api.parse(response));
    // console.log(response);

    this.store(response)
  },
  store: function(response) {
    // stap 5
    console.log('//stap 5');
    pokeFiltered = {base_experience: response.base_experience, height: response.height, id: response.id, moves: response.moves, name: response.name, order: response.order, sprites: response.sprites, stats: response.stats, type: response.type, weight: response.weight}
    // render.overview();
  },
  filter: function() {},
}

//render

var render = {
  overview: function() {
    var element = document.getElementById("pokemoncard");
    element.innerHTML +=    `
    <p class="pokeCP">CP <span>${pokeFiltered.base_experience}</span></p>
    <img src="${pokeFiltered.sprites.front_default}" alt="">
    <a href="${'file:///Users/backend/Desktop/webDev/example/index.html'+'#'+(pokeFiltered.name)}">${(pokeFiltered.name)}</a>

    `
  },
  detail: function(x) {
  console.log('detail = ' + x);
  // var element = document.getElementById("pokemoncard");
  // element.innerHTML +=    `
  // <p>detail ${x}</p>
  // `
  },
}
// example
router.overview();
