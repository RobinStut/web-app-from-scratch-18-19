console.log('welkom');


var app = {

  init: function() {
    localStorage.clear();
    console.log('init');
    if (localStorage.length === 0) {
      api.get();
    } else {
      console.log('data al opgehaald');
    }
  },

  development: function() {
    console.log('developer');
  },

};


var api = {

  get: async function() {
    var url = 'https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0';
    var list = await this.call(url);
    data.store(list);
    list.results.map(async function(item) {
      var detailList = await api.detail(item.url);
      render.overview(data.filter(detailList));

    });
  },

  detail: async function(url) {
    var details = [await api.call(url)];
    return details;
  },

  call: async function(url) {
    var data = await fetch(url);
    var res = await data.json();
    return res;
  },

};

var data = {

  store:function(data){
    localStorage.setItem('urlList', JSON.stringify(data.results));
  },

  parse: function(item) {
    var parsed = JSON.parse(localStorage.getItem(item));
    return parsed;
  },

  merge: function(data) {
    var newData = this.filter(data);
    var currentData;
    if (localStorage.getItem('data') === null) {

      localStorage.setItem('data', JSON.stringify(newData));
      currentData = this.parse('data');
    } else {
      // console.log(currentData);
      Array.prototype.push.apply(newData, currentData);
      localStorage.setItem('data', JSON.stringify(newData));
      currentData = this.parse('data');
    }

    return currentData;
  },

  filter: function(data) {
    var filter = [];
    filter.push({
      name: data[0].name,
      id: data[0].id,
      xp: data[0].base_experience,
      height: data[0].height,
      weight: data[0].weight,
      moves: data[0].moves,
      stats: data[0].stats,
      type: data[0].types[0].type.name,
      img: data[0].sprites.front_default
    });
    return filter;
  },

  sort: function (a, b) {
    // console.log(a);
      var idA = a.id;
      var idB = b.id;

      var comparison = 0;
      if (idA > idB) {
        comparison = 1;
      } else if (idA < idB) {
        comparison = -1;
      }
      return comparison;
  },
};



var render = {

  loader: function(id) {
    console.log('removed ' + id);
    var render = data.map(function(data) {
      return `
          <img src="img/pokeball.gif " alt="loading">
          `;
    }).join("");
    id.insertAdjacentHTML('beforeend', render);
  },

  overview: function(data) {
    console.log(data);
    var id = document.getElementById('wrapper');
    var render = data.map(function(data) {
      return `
          <section class="pokemoncard">
          <p class="pokeCP">CP<span>${data.xp}</span></p>
          <img src="${data.img} " alt="picture of ${data.name}">
          <a href="#${data.name}" class="pokeName">${data.name}</a>
          </section>
          `;
    }).join("");
    id.insertAdjacentHTML('beforeend', render);
  },

  remove: function(id) {
    console.log('removed ' + id);
    document.getElementById(id).innerHTML = '';
  },

};


app.init();
