var storedData = [];
var localData;
var loader = 0;
localStorage.clear()

var router = {
  handle: function(){
    if ((window.location.hash.length) > 2) {
      console.log('detailpage handler');
      router.detail();
    }
    else {
      console.log('overzichtspage handler');
      router.overview();
    }
  },
  overview: function(){routie('', hash => { {
    console.log(' ');
    console.log('router.overview');
    // console.log(window.location.pathname.length);
    if (localStorage.length !== 0) {
      render.loader();
      // router.handle();
      // api.local();
      // console.log(localData);
      // localData = JSON.parse(localStorage.getItem('data'));
      // console.log(localStorage);
      console.log('Local store heeft data');

      api.local();
      render.overview();
    }
    else {
    console.log('geen locale storage dus ophalen die hap');
    console.log(localData);
    render.loader();
    api.get('overview')

    }
  }})
  },
  detail: function(){routie(':name', name => {
    // console.log(window.location.pathname);
    console.log(' ');
    if (localStorage.length === 0) {
      console.log('localstorage is leeg');
      render.loader();
      api.get('overview')
    }
    else if (localStorage.length !== 0) {
      console.log('storage is gevuld');
      console.log('router.detail');
      console.log(name);
      render.loader();
      if (localData === undefined) {
        console.log('localData is leeg');
        render.loader();
        api.parseLocal();
        render.detail(name);
      }
      else if (localData !== undefined) {
        // console.log(localData);
        console.log('localdata is niet leeg');
        render.detail(name);
      }
      }
      // console.log(x);

  })
},
};

//API
var api = {
  get: function(route) {
    var url = "https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0";
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
          api.local();
          render.overview(localData);
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
    // console.log(localStorage.storedData);
    // // console.log(storedData);

  },
  local: function(response) {
    if (localStorage.length === 0) {
      localStorage.setItem('data', JSON.stringify(storedData));
    }
    api.parseLocal();
  },
  parseLocal: function(response) {
      localData = JSON.parse(localStorage.getItem('data'));
  },
};

//RENDER
var render = {
  loader: function(response) {
    console.log('render.loader');
    var load = document.getElementById("loading");
    load.innerHTML +=  `
                          <img src="pokeball2.gif" alt="pokeball loader">
                          `;

  },
  overview: function(data) {

        console.log('render.overview');
        // console.log(localData);
        var element = document.getElementById("wrapper");
        document.getElementById("loading").innerHTML = " ";
        document.getElementById("detail").innerHTML = " ";
                localData.forEach(function(item){
          // storedData.forEach(function(item){
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
    document.getElementById("loading").innerHTML = " ";
    document.getElementById("wrapper").innerHTML = " ";
    console.log('render.detail');
    console.log(data);

    function findEqual(detail) {
    return detail.name === data;
    }
    // console.log(localData);
    // console.log(localStorage);
    equalTo = (localData.find(findEqual));
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
  var exit = document.getElementById("exit");
  exit.onclick = function(){
     console.log(' ');
     console.log('exit geklikt');
     render.overview();
   };


  }
};

router.handle();
