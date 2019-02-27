var storedData = [];
var localData;
var loader = 0;

var app = {
  init: function() {
    this.development();
    router.handle();
  },
  development:function(){
    // localStorage.clear();
  }
}

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
  overview: function(){
    routie('', hash => { {
    console.log('pagina gerefreshed, opnieuw in routie');
    console.log(' ');
    console.log('router.overview');
    if (localStorage.length === 1) {
      render.loader();
      console.log('Local store heeft data');
      localHandle.local();
      render.overview();
    }
    else {
    console.log('geen locale storage dus ophalen die hap');
    console.log(localData);
    render.loader();
    api.getOverview('overview')

    }
  }})
  },
  detail: function(){
    routie(':name', name => {
    // console.log(window.location.pathname);
    console.log('detail aangeroepen');
    console.log(' ');
    if (localStorage.length === 0) {
      console.log('localstorage is leeg');
      render.loader();
      api.getOverview('overview')
    }
    else {
      console.log('storage is gevuld');
      console.log('router.detail');
      console.log(name);
      render.loader();
      if (localData === undefined) {
        console.log('localData is leeg');
        render.loader();
        localHandle.parseLocal();
        render.detail(name);
      }
      else {
        // console.log(localData);
        console.log('localdata is niet leeg');
        render.detail(name);
      }
      }
      // console.log(x);
  })
},
};

var api = {
  getOverview: function(route) {
    var url = "https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0";

    console.log('api.getOverview');
    console.log('url ' + URL);

    async function apiRequest() {
      let response = await fetch(url);
      let data = await response.json()

      console.log(data);
      console.log('async apiRequest');
      dataHandle.filterOverview(data);
      // return data;
    }
    apiRequest()

  },
  getDetail: function(response) {
    var arrayLength = response.length;
    var loopCount = 0;
    console.log('api.getDetail');
    console.log(loopCount);
console.log(response);
    response.map(function(item) {
      async function apiRequest() {
        let response = await fetch(item.url);
        let data = await response.json()
        console.log('async apiRequest2');
        dataHandle.filterDetail(data);
        loopCount++;
        console.log(loopCount);

        if (loopCount === arrayLength) {
          console.log('forEach is klaar');
          localHandle.local();
          render.overview(localData);
          console.log('overview klaar');
          router.detail(storedData.name);
        }
      }
      apiRequest()
    });
  },
};

var dataHandle = {
  filterOverview: function(data) {
    console.log('api.filterOverview');
    // console.log(data.results);
    filteredData = [];
    data.results.forEach(function(data) {
      filteredData.push({
        url: data.url,
      });
    })
    // console.log(filteredData);
    console.log('klaar met eerste filter');
    api.getDetail(filteredData)
  },

  filterDetail: function(data) {
    console.log('api.filterDetail');
    console.log(data);
    console.log(data.name);
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
    filteredData2 = [];
    console.log('einde api.filterDetail');
    this.store(filteredData);
  },
  store: function(response) {
    console.log('dataHandle.store');
    Array.prototype.push.apply(storedData, response);
  },
}

var localHandle = {
  local: function() {
    if (localStorage.length === 0) {
      localStorage.setItem('data', JSON.stringify(storedData));
    }
    this.parseLocal();
  },
  parseLocal: function() {
      localData = JSON.parse(localStorage.getItem('data'));
  },
}

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
        console.log(localData);
        var element = document.getElementById("wrapper");
        document.getElementById("loading").innerHTML = " ";
        document.getElementById("detail").innerHTML = " ";
                localData.forEach(function(item){
                  // console.log(item);
                  // console.log('regel 197');
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

  console.log(localStorage);
  console.log(localData);
  console.log(window.location.hash);
  console.log('eind van render.detail');
  var exit = document.getElementById("exit");
  exit.onclick = function(){
    if (localData !== undefined) {
      console.log('niet undefined');
    }
     console.log(' ');
     console.log('exit geklikt');
     console.log(localStorage.length);
       render.overview();

   };


  }
};

app.init();
