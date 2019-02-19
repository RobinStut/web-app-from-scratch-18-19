var storedData = [];

var router = {
  detail: function() {
    routie(":objectNumber", function() {
      api.get("detail");
    });
  },
  overview: function() {
    routie("/alles", function() {
      api.get("overview");
    });
  },
  overview: function() {
    api.get("overview");
  }
};

//API
var api = {
  get: function(route) {
    var url = "https://pokeapi.co/api/v2/pokemon/?limit=12&offset=0";
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
    console.log(filteredData);
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
        }
        // return data;
      }
      apiRequest()
    });
  },
  nextFilter: function(data) {
    console.log('api.nextFilter');
    // console.log(data);
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
      img: data.sprites,
    });
    // console.log(filteredData);
    console.log('klaar met eerste filter');
    api.store(filteredData)
  },
  store: function(response) {
    console.log('api.store');
    // console.log(response);
    Array.prototype.push.apply(storedData, response);
    console.log(storedData);

  },
};

//RENDER
var render = {
    overview: function(data) {
        console.log('render.overview');
        var element = document.getElementById("wrapper");

        storedData.forEach(function(item){
          console.log(item);
          element.innerHTML +=
        `
        <div id="pokemoncard" class="pokemoncard">
        <p class="pokeCP">CP <span>${item.xp}</span></p>
        <img src="${item.img.front_default}" alt="picture of ${item.name}">
        <a class="pokeName" href="${(window.location.href)+'#'+(item.name)}">${item.name}</a>
        </div>
        `
});


  },

  detail: function(data) {}
};

router.overview();
