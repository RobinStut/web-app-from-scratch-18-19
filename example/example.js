var storedData = [];

var router = {
  overview: function() {
    console.log('router.overview');
    api.get('overview')
  },
  detail: function(){routie(':name', name => {
    // console.log(x);
    console.log('router.detail');
    console.log(name);
    render.detail(name);
  })
},
clearDetail: function(){routie(':#', hash => {
  // console.log(x);
  console.log('router.clearDetail');
  console.log(hash);
  // render.detail(name);
})
},
};

//API
var api = {
  get: function(route) {
    var url = "https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0";
    var api1Results

    console.log('api.get');
    console.log('url ' + URL);

    async function apiRequest() {
      let response = await fetch(url);
      let data = await response.json()

      console.log(data);
      console.log('async apiRequest');
      api.filter(data);
      // return data;
    }
    apiRequest()
    // .then(data =>{
    //
    //   console.log('then');
    //
    //
    // } );

  },
  filter: function(data) {
    console.log('api.filter');
    // console.log(data.results);
    filteredData = [];
    data.results.forEach(function(data) {
      filteredData.push({
        url: data.url,
      });
    })
    // console.log(filteredData);
    console.log('klaar met eerste filter');
    this.nextGet(filteredData)
  },
  nextGet: function(response) {
    var arrayLength = response.length;
    var loopCount = 0;
    console.log('api.nextGet');
    console.log(loopCount);

    response.forEach(function(item) {
      async function apiRequest() {
        let response = await fetch(item.url);
        let data = await response.json()
        console.log('async apiRequest2');
        api.nextFilter(data);
        loopCount++;
        console.log(loopCount);
        if (loopCount === arrayLength) {
          console.log('forEach is klaar');
          render.overview();
          console.log('overview klaar');
          router.detail(storedData.name);
        }
        // return data;
      }
      apiRequest()
    });
  },
  nextFilter: function(data) {
    console.log('api.nextFilter');
    console.log(data.name);
    // console.log(data.results);
    filteredData = [];
    filteredData.push({
      name: data.name,
      id: data.id,
      xp: data.base_experience,
      height: data.height,
      weight: data.weight,
      moves: data.moves,
      stats: data.stats,
      type: data.types[0].type.name,
      img: data.sprites,

    });
    // console.log(filteredData);
    console.log('einde api.nextFilter');
    api.store(filteredData)
  },
  store: function(response) {
    console.log('api.store');
    // console.log(response);
    Array.prototype.push.apply(storedData, response);
    // console.log(storedData);

  },
};

//RENDER
var render = {
    overview: function(data) {
        console.log('render.overview');
        var element = document.getElementById("wrapper");

        storedData.forEach(function(item){
          // console.log(item);
          element.innerHTML +=  `
                                <div class="pokemoncard">
                                <p class="pokeCP">CP <span>${item.xp}</span></p>
                                <img src="${item.img.front_default}" alt="picture of ${item.name}">
                                <a class="pokeName" href="${'#'+(item.name)}">${item.name}</a>
                                </div>
                                `;
});
  },
  detail: function(data) {
    var equalTo = [];
    var element = document.getElementById("detail");
    var exit = document.getElementById("exit");
    console.log('render.detail');
    console.log(data);

    function findEqual(detail) {
    return detail.name === data;
    }

    equalTo = (storedData.find(findEqual));
    console.log(equalTo);

    element.innerHTML += `
                          <div class="detailcard">
                          <p class="pokeCP">CP <span>${equalTo.xp}</span></p>
                          <img src="${equalTo.img.front_default}" alt="picture of ${equalTo.name}">
                          <div class="statistics1">
                          <p class="pokeName">${equalTo.name}</p>
                          <progress value="100" max="100">
                          </div>
                          <div class="statistics2">
                          <div class="weight"><strong>${(equalTo.weight)/10}kg</strong><p>WEIGHT</p></div>
                          <div class="type"><section class="${equalTo.type}">${equalTo.type.slice(0, 1).toUpperCase()}</section><p>${equalTo.type.toUpperCase()}</p></div>
                          <div class="height"><strong>${(equalTo.height)/10}m</strong><p>HEIGHT</p></div>
                          </div>
                          <div class="statistics3">
                          <section><strong>${equalTo.moves[3].move.name}</strong><p>lvl <strong>${equalTo.moves[3].version_group_details[0].level_learned_at}</strong></p></section>
                          <section><strong>${equalTo.moves[equalTo.moves.length - 2].move.name}</strong><p>lvl <strong>${equalTo.moves[equalTo.moves.length - 2].version_group_details[0].level_learned_at}</strong></p></section>
                          </div>
                          <a id="exit" class="exit" href="#">X</a>
                          </div>
                          `;

  console.log('eind van render.detail');
  exit.onclick = function(){
     console.log('exit geklikt');
   };


  }
};

router.overview();
